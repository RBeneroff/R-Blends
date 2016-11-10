# Color Picker Planning & ERD - Ruby on Rails/AngularJS

requirements:
- at least 2 models
- deployed
- Angular front-end with full CRUD & RESTful routing
- Authentication

API/Plugins:
- http://bgrins.github.io/spectrum/?color=%23000000&color2=%233355cc&color3=%237954e4#why-devtools
- https://github.com/bgrins/spectrum

## ERD:
  Schema:
    CreateUsers
      t.string :username - validates (unique, must have)
      t.string :email_address - validates (proper email form, must have)
      t.string :password
    CreateColorScheme
      t.string :color_scheme_name
      t.string :color_one
      t.string :color_two
      t.string :color_three    
      t.string :color_four
      t.string :color_five

  Controllers:
    UsersController (create, login, update, show, destroy, token, user_params)
    SchemeController (create, destroy, show, scheme_params)

  Models:
    User Model
      class User < Application Record
    Scheme Model
      class Model < Application Record

  Relationships:
    User has_many :schemes
    Scheme belongs_to :user

Pages:
- Home
- Log In & Sign Up page (two separate pages)
- Explore (page with lots of different color schemes)
- Blend (your user's page -- where you can mix/match colors)
  - can save your color schemes

Reaches:
- have the explore page be the color schemes that other user's put together
- be able to change the colors of the website when choosing colors

How to use Spectrum:
- var value = $("#font_color").val();
- $("#font_color").spectrum('get');
- $("#font_color").spectrum('get').toHexString();
- color.toRgbString() work for me
- in use: http://jsfiddle.net/bgrins/ctkY3/
