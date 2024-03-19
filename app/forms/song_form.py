from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError

class CreateSongForm(FlaskForm):
    songs_name = StringField("Song Title", validators=[DataRequired()]) # for aws test
    # song_url = StringField("Song File", validators=[DataRequired()]) # for postman test
    song_url = FileField("Song File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")
