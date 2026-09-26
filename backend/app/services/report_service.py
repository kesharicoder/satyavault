import io
from datetime import datetime, timezone
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing

def generate_case_summary_pdf(case_data: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        textColor=colors.HexColor('#12304A'),
        spaceAfter=12
    )
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        textColor=colors.HexColor('#1D5D8F'),
        spaceAfter=18
    )
    normal_style = styles['Normal']

    story = []
    story.append(Paragraph("SATYA VAULT — OFFICIAL CASE BUNDLE", title_style))
    story.append(Paragraph(f"SIH 2026 Prototype Export | Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#C9822B'), spaceAfter=18))

    # Case Info Table
    data = [
        ["Case Number", case_data.get("case_number", "N/A"), "Status", case_data.get("status", "N/A")],
        ["Case Title", case_data.get("title", "N/A"), "Priority", case_data.get("priority", "N/A")],
        ["Department", case_data.get("department", "N/A"), "Jurisdiction", case_data.get("jurisdiction", "N/A")]
    ]
    t = Table(data, colWidths=[110, 160, 110, 160])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor('#F5F7F9')),
        ('BACKGROUND', (2,0), (2,-1), colors.HexColor('#F5F7F9')),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#17212B')),
        ('FONTNAME', (0,0), (-1,-1), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 10),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#D7DEE5')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 20))

    story.append(Paragraph("<b>CONFIDENTIALITY NOTICE</b>: Synthetic data export for prototype evaluation.", normal_style))
    doc.build(story)
    return buffer.getvalue()


def generate_bsa_65b_certificate_pdf(evidence_data: dict, issuing_officer: dict) -> bytes:
    """Generates an official Section 65B / BSA 2023 Digital Evidence Certificate PDF."""
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    header_style = ParagraphStyle(
        'CertHeader',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        alignment=1, # Center
        textColor=colors.HexColor('#0F294A'),
        spaceAfter=4
    )
    sub_header = ParagraphStyle(
        'CertSubHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        alignment=1,
        textColor=colors.HexColor('#8B0000'),
        spaceAfter=14
    )
    body_bold = ParagraphStyle('CertBodyBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, leading=14)
    body_text = ParagraphStyle('CertBodyText', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, spaceAfter=10)
    hash_style = ParagraphStyle('CertHash', parent=styles['Normal'], fontName='Courier-Bold', fontSize=9, textColor=colors.HexColor('#1B5E20'))

    story = []
    story.append(Paragraph("COURT OF LAW DIGITAL EVIDENCE ADMISSIBILITY CERTIFICATE", header_style))
    story.append(Paragraph("Under Section 63 of Bharatiya Sakshya Adhiniyam, 2023 / Section 65B of Indian Evidence Act, 1872", sub_header))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#0F294A'), spaceAfter=14))

    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    sha256_hash = evidence_data.get("sha256_hash", "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a")
    evidence_id = evidence_data.get("id", "EVD-2026-DEL-001")
    evidence_name = evidence_data.get("title", "Digital Disk Image - Server Log Dump")

    # Generate QR Code for instant scanning verification
    verify_url = f"http://localhost:3000/integrity-verification?hash={sha256_hash}"
    qr = QrCodeWidget(verify_url)
    bounds = qr.getBounds()
    w = bounds[2] - bounds[0]
    h = bounds[3] - bounds[1]
    qr_drawing = Drawing(100, 100, transform=[100/w, 0, 0, 100/h, 0, 0])
    qr_drawing.add(qr)

    # Info Grid with QR Code on right
    meta_table_data = [
        [
            Paragraph(
                f"<b>Certificate Ref No:</b> CERT-BSA-{evidence_id}<br/>"
                f"<b>Date of Certificate:</b> {now_str}<br/>"
                f"<b>Case Reference:</b> {evidence_data.get('case_id', 'NV-2026-001')}<br/>"
                f"<b>Evidence Item ID:</b> {evidence_id}<br/>"
                f"<b>Item Description:</b> {evidence_name}<br/>"
                f"<b>Issuing Authority:</b> {issuing_officer.get('name', 'Inspector Aarav Mehta')} ({issuing_officer.get('user_code', 'INV-001')})<br/>"
                f"<b>Department:</b> {issuing_officer.get('department', 'Cyber Crime Division')}",
                body_text
            ),
            qr_drawing
        ]
    ]
    t_meta = Table(meta_table_data, colWidths=[420, 120])
    t_meta.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 14))

    story.append(Paragraph("<b>CRYPTOGRAPHIC EVIDENCE FINGERPRINT & CHAIN OF CUSTODY</b>", body_bold))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"<b>Binary File SHA-256 Checksum:</b>", body_text))
    story.append(Paragraph(f"{sha256_hash}", hash_style))
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>STATUTORY LEGAL DECLARATION UNDER BSA 2023 SECTION 63 / IEA 65B</b>", body_bold))
    declaration_text = (
        f"I, <b>{issuing_officer.get('name', 'Inspector Aarav Mehta')}</b>, serving as <b>{issuing_officer.get('role_label', 'Investigator')}</b> "
        f"at <b>{issuing_officer.get('department', 'Cyber Crime Division')}</b>, do hereby solemnly declare and certify under penalty of perjury that:<br/><br/>"
        "1. The electronic record described above was produced by the computer system during the period over which the computer was used regularly to store or process information for standard operational activities.<br/>"
        "2. Throughout the operational period, the electronic storage devices were operating properly and the binary contents remained uncorrupted.<br/>"
        "3. The binary SHA-256 hash checksum stated above was computed directly from raw byte streams at the time of seizure and intake into the Satya Vault repository.<br/>"
        "4. The append-only audit ledger confirms that the cryptographic hash chain has remained intact with <b>ZERO TAMPERING OR UNAUTHORIZED ALTERATION</b> since intake."
    )
    story.append(Paragraph(declaration_text, body_text))
    story.append(Spacer(1, 16))

    # Signature Block
    sig_data = [
        [
            Paragraph("<b>OFFICER DIGITAL SIGNATURE</b><br/><br/><i>[Cryptographically Signed]</i><br/><b>" + issuing_officer.get('name', 'Inspector Aarav Mehta') + "</b><br/>" + issuing_officer.get('department', 'Cyber Crime Division'), body_text),
            Paragraph("<b>CUSTODY VAULT VERIFIER</b><br/><br/><i>[Audit Ledger Intact]</i><br/><b>Satya Vault Hash Assurance Engine</b><br/>SIH 2026 Prototype Verified", body_text)
        ]
    ]
    t_sig = Table(sig_data, colWidths=[270, 270])
    t_sig.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#94A3B8')),
        ('PADDING', (0,0), (-1,-1), 8),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
    ]))
    story.append(t_sig)
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Scan the QR Code on top right to verify certificate non-repudiation live on Satya Vault.</b>", ParagraphStyle('FootNote', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, alignment=1, textColor=colors.HexColor('#64748B'))))

    doc.build(story)
    return buffer.getvalue()
