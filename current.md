# R-Blends - current tasks/bugs/reaches

Working on:
- need to remove all unnecessary stuff from all_color_schemes
- on Blend page - when click 'choose' the color updates in the pixel rectangle immediately
    http://lugolabs.com/articles/71-how-to-use-a-color-picker-in-javascript
    http://jsfiddle.net/ctkY3/768/

Bugs to fix:
- make sure everything is mobile friendly (is there a show-on-small-only?)

Reaches/other feature to implement:
- add validation to saving cover schemes (cant submit without name and at least one colors)
- be able to change the colors of the website when choosing colors
- in Settings:
  - be able to create your own customized color scheme for the website
  - upload your own photo
  - track your history
- add an invite friends button to the user's dropdown menu
- create a function to randomize the 10 color schemes that show on the explore page
- add validations to forms: (have it shaking - but tell why it failed, shake more than once if doesn't meet validation multiple times) http://demo.geekslabs.com/materialize/v3.1/form-validation.html?action=
https://www.sitepoint.com/easy-form-validation-angularjs-ngmessages/
- customize Spectrum's color picker

Stumped on:
- user doesn't persist on page refresh -- token still in localStorage, but doesn't recognize user

COMPLETE: MVP done
- authentication (log in, sign up, log out)
- CRUD
- at least 2 models
- deployed
