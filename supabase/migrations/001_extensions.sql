-- Migration 001: Required Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";
create extension if not exists "pgcrypto";
