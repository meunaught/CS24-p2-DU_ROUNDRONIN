"""create users table

Revision ID: fedfd9f241c5
Revises: 
Create Date: 2024-03-30 16:57:30.848938

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fedfd9f241c5'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True, nullable=False),
        sa.Column('email', sa.String, unique=True),
        sa.Column('password_hash', sa.String, nullable=False),
        sa.Column('role', sa.String, default="Unassigned")
    )
    pass


def downgrade() -> None:
    op.drop_table('users')
    pass
