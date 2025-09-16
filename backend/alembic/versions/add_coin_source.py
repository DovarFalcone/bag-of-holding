"""
Revision ID: add_coin_source
Revises: 
Create Date: 2025-09-15
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('coins', sa.Column('source', sa.String(length=50), nullable=True))

def downgrade():
    op.drop_column('coins', 'source')
