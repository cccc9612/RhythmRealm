from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FileField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from app.models import Song
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class SongForm(FlaskForm):
    song_name = StringField('Song Name', validators=[DataRequired()])
    artist_id = IntegerField('Artist Id', validators=[DataRequired()])
    song_cover_image = FileField('Song Cover URL', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    # song_file_url = FileField('Song File URL', validators=[FileAllowed(list(SONGS_ALLOWED_EXTENSIONS))])
    duration = IntegerField('Duration', validators=[DataRequired()])
    submit = SubmitField('Add Song')
