# Color Picker Planning & ERD - Ruby on Rails/AngularJS

Working on:
- being able to delete from all_color_schemes when deleting from users color scheme
- show all color schemes on explore page
- refresh color scheme form after submission

Bugs to fix:
- when you log out and sign in under another user, if you don't refresh, the other user's color schemes show up until you click the button or add a new one
- heroku not dynamically updating but local is?

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

Reaches:
- have the explore page be the color schemes that other user's put together
- be able to change the colors of the website when choosing colors
- in Settings:
  - be able to create your own customized color scheme for the website
  - upload your own photo
  - track your history
- add an invite friends button to the user's dropdown menu

How to use Spectrum:
- var value = $("#font_color").val();
- $("#font_color").spectrum('get');
- $("#font_color").spectrum('get').toHexString();
- color.toRgbString() work for me
- in use: http://jsfiddle.net/bgrins/ctkY3/

COMPLETE: basic MVP done
- authentication (log in, sign up, log out)
- CRUD
- at least 2 models
- deployed
