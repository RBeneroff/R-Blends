# Color Picker Planning & ERD - Ruby on Rails/AngularJS

## ERD:
  Schema:
    CreateUsers
      t.string :username - validates (unique, must have)
      t.string :email_address - validates (proper email form, must have)
      t.string :password_digest
    CreateColorScheme
      t.string :color_scheme_name
      t.string :color_one
      t.string :color_two
      t.string :color_three    
      t.string :color_four
      t.string :color_five

  Controllers:
    UsersController (create, login, update, show, destroy, token, user_params)
    ColorSchemesController (create, destroy, show, scheme_params)

  Models:
    User Model
      class User < Application Record
    Scheme Model
      class Model < Application Record

  Relationships:
    User has_many :schemes
    Scheme belongs_to :user

Pages:
- Home - can choose any color and change anything on the site
- Log In & Sign Up page (two separate pages)
- Explore (page with lots of different color schemes)
- Blend (your user's page -- where you can mix/match colors)
  - can save your color schemes
- Settings - update password and email address

How to use Spectrum:
- var value = $("#font_color").val();
- $("#font_color").spectrum('get');
- $("#font_color").spectrum('get').toHexString();
- color.toRgbString() work for me
- in use: http://jsfiddle.net/bgrins/ctkY3/
