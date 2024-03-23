from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError
# from app.models import Album

class CreateAlbumForm(FlaskForm):
    name = StringField("Album Title", validators=[DataRequired()])
    # cover_img = StringField("Cover Image File", validators=[DataRequired()]) # for postman test
    cover_img = FileField("Cover Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]) # for aws test
    submit = SubmitField("Submit")