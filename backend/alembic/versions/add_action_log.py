"""
Revision ID: add_action_log
Revises: 
Create Date: 2025-09-15
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'action_logs',
        sa.Column('id', sa.String(length=36), primary_key=True),
        sa.Column('entity_type', sa.String(length=32), nullable=False),
        sa.Column('entity_id', sa.String(length=36), nullable=False),
        sa.Column('action_type', sa.String(length=64), nullable=False),
        sa.Column('description', sa.String(length=256), nullable=False),
        sa.Column('timestamp', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('user', sa.String(length=64), nullable=True),
    )

def downgrade():
    op.drop_table('action_logs')
