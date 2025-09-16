"""Change character_id to string type in containers table

Revision ID: fix_container_charid_str
Revises: d79eae647ee7
Create Date: 2025-09-15 20:00:00.000000
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'fix_container_charid_str'
down_revision: Union[str, Sequence[str], None] = 'd79eae647ee7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # SQLite does not support ALTER COLUMN, so we need to recreate the table
    with op.batch_alter_table('containers', recreate='always') as batch_op:
        batch_op.alter_column('character_id', type_=sa.String(36))

def downgrade() -> None:
    with op.batch_alter_table('containers', recreate='always') as batch_op:
        batch_op.alter_column('character_id', type_=sa.String(36))
