"""empty message

Revision ID: 1d30b0d188a2
Revises: 15c452251dbe
Create Date: 2025-03-21 21:09:23.803141

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1d30b0d188a2'
down_revision: Union[str, None] = '15c452251dbe'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('passed_intro', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'passed_intro')
    # ### end Alembic commands ###
