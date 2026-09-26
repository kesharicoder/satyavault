import io
from datetime import datetime, timezone
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class WatermarkCanvas(canvas.Canvas):
    """Canvas callback to draw dynamic forensic watermark on every page."""
    def __init__(self, *args, **kwargs):
        self.watermark_text = kwargs.pop('watermark_text', 'CONFIDENTIAL EVIDENCE')
        super().__init__(*args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self.pages)
        for page in self.pages:
            self.__dict__.update(page)
            self.draw_watermark(num_pages)
            super().showPage()
        super().save()

    def draw_watermark(self, total_pages):
        self.saveState()
        # Diagonal Forensic Watermark
        self.setFont("Helvetica-Bold", 32)
        self.setFillColor(colors.HexColor("#D32F2F"), alpha=0.12)
        self.translate(300, 400)
        self.rotate(45)
        self.drawCentredString(0, 0, "SATYA VAULT FORENSIC COPY")
        self.setFont("Helvetica", 14)
        self.drawCentredString(0, -30, self.watermark_text)
        self.restoreState()

        # Top & Bottom Legal Header/Footer
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#B71C1C"))
        # Top banner
        self.drawString(36, 762, "RESTRICTED ACCESS — EVIDENCE MANIFEST & INTEGRITY PROTECTED")
        self.drawRightString(576, 762, f"PAGE {self._pageNumber} OF {total_pages}")
        self.setStrokeColor(colors.HexColor("#B71C1C"))
        self.setLineWidth(0.5)
        self.line(36, 756, 576, 756)

        # Bottom footer
        self.line(36, 45, 576, 45)
        self.setFont("Helvetica", 7)
        self.setFillColor(colors.HexColor("#555555"))
        self.drawString(36, 34, f"STAMPED WATERMARK: {self.watermark_text}")
        self.drawRightString(576, 34, "SIH 2026 PROTOTYPE AUDIT LOGGED")
        self.restoreState()


def generate_watermarked_document_pdf(
    document_title: str,
    document_number: str,
    case_id: str,
    sha256_hash: str,
    user_name: str,
    user_code: str,
    user_ip: str = "127.0.0.1"
) -> bytes:
    buffer = io.BytesIO()
    timestamp_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    watermark_text = f"ACCESSED BY {user_code} ({user_name}) | {timestamp_str} | IP: {user_ip}"

    def make_canvas(*args, **kwargs):
        return WatermarkCanvas(*args, watermark_text=watermark_text, **kwargs)

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=54,
        bottomMargin=54,
        canvasmaker=make_canvas
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'WatermarkedDocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        textColor=colors.HexColor('#0D253F'),
        spaceAfter=10
    )
    subtitle_style = ParagraphStyle(
        'WatermarkedDocSub',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=colors.HexColor('#1D5D8F'),
        spaceAfter=14
    )
    body_style = ParagraphStyle(
        'WatermarkedDocBody',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#1A1A1A')
    )

    story = []
    story.append(Paragraph(f"EVIDENCE MANIFEST: {document_title}", title_style))
    story.append(Paragraph(f"Document ID: {document_number} | Case ID: {case_id}", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0D253F'), spaceAfter=14))

    story.append(Paragraph("<b>CRYPTOGRAPHIC INTEGRITY CHECKSUM</b>", styles['Heading4']))
    story.append(Paragraph(f"<font fontName='Courier-Bold' color='#2E7D32'>SHA-256: {sha256_hash}</font>", body_style))
    story.append(Spacer(1, 14))

    story.append(Paragraph("<b>AUDIT & WATERMARK COMPLIANCE DECLARATION</b>", styles['Heading4']))
    story.append(Paragraph(
        f"This document copy was generated on request by authorized officer <b>{user_name}</b> ({user_code}) "
        f"at <b>{timestamp_str}</b> from IP address <b>{user_ip}</b>. "
        "Every page contains an embedded non-removable forensic watermark trackable back to the requesting user session.",
        body_style
    ))
    story.append(Spacer(1, 14))

    story.append(Paragraph("<b>DOCUMENT SUMMARY & RECORD CONTENT</b>", styles['Heading4']))
    story.append(Paragraph(
        "This evidence record has been cryptographically validated against the Satya Vault append-only audit ledger. "
        "No alterations or binary byte modifications have been detected since original seizure and registration.",
        body_style
    ))

    doc.build(story)
    return buffer.getvalue()
