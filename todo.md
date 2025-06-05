# Todo

- restructure images for all data types like: character.images.profile_images og character.images.gallery_images etc
- support several pics for character portrait
- full image view popup thingy on portraits (and later on other big images)
- make it possible for an article's data to like a character to have multiple images for their portrait - if they do, make little tabs on top of the image so that you can cycle through them - those tabs need names/indicators as well (normal, overworld, portrait, bossfight, transformed, etc)

- prettify the key-names from json ("eye_color" is presented as "Eye Color")

- design top menu (put mini versions of the logo on both sides of the menu)

- dropdowns on top menu - only after youve made subcategories i suppose

- on the top right a little audio player where you can toggle bg music - leave off as default!

- footer with list of all of the current category you're viewing or list of all categories or simply list of all entries in the wiki organized by category

- Make a ESSENCE banner/logo thing
- Make an actual logo for the franchise - like an eye or brain or some mystical symbol that feels near to your heart
- make overlay art
- draw some more cartoony sketches of the characters, give them some charicature and personality, perhaps just portraits that can be used for the wiki and or game

- generally adjust margin, padding, border, font type, take insp from funger and wikipedia

- make a style guide - i.e. set 5-6 colors main colors as variables and then just use those where applicable

- make like little lore notes "embedded" on certain pages to make them look like literal notes and give them the courier text if its machine written, italic handwriting etc if so.
generally just be creative with styling, shit like that is cool.

nice to have:
- perhaps a collapsable menus on the left side of each page in which you can get a folder structure view of all site data and articles
- implement tags
- maybe gallery at the bottom of article (like all pictures of a character)

right now i have the following code for dynamically populating an infobox on my wiki-type static website.
i want each info type to be divided into columns, where the key goes on the left, and the value(s) go on the right - with each value going on a line of its own. i also want a thin border around all sides of both columns. 
i also want to add a spoiler tag on top of certain values, but im not sure what the smartest way to do so would be, seeing as im probably gonna want to put spoiler tags on things that exist in different layers of different types of data objects.
i also want a way to prettify the keys, so that for example "eye_color" is printed as "Eye Color" on the page.