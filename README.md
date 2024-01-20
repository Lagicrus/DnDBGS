# DnDBGS

This web extension is designed to allow easy importing of Griffon Saddlebag content that you own into DnDBeyond.

## How to use?

1. Once the addon is installed, go to Griffon Saddlebag, and optionally log in.
2. Click on an item you want to import, this will open a modal/popup.
3. Click on the extension icon in the top right of your browser.
4. Click on the "Get current Magic Item" button at the bottom of the popup.
5. This will save the item into the extension.
   You should now see it show the name of the item in the extension alongside an image if you have that setting enabled.
6. Go to DnDBeyond and open up the Create Magic Item from Scratch page, alternatively go to https://www.dndbeyond.com/homebrew/creations/create-magic-item.
7. Click on the extension icon in the top right of your browser.
8. Click on the "Fill in Form" button at the bottom of the popup.
9. This will fill in the form with the data from the extension before your eyes.
10. Click on the "Create Magic Item" button on the DnDBeyond page to create your item.
11. If all goes according to plan, you should now have a new magic item in your DnDBeyond homebrew.
12. On the edit page for the Magic Item you created, click on the extension icon in the top right of your browser.
13. You now have two new buttons, "Fill in other details" and "i".
14. If you click on the "i" button you can see the currently extracted extra details from Magic Item.
15. If you click on the "Fill in other details" button, it will fill in the rest of the details for you that it currently can. This may take a bit.
16. Repeat steps 1-15 for all the items you want to import.

## How to install?

In theory all browsers are currently supported, but I have only tested it on Firefox and Chrome.
You can install by cloning this repo and then building the extension using `npm run build` and `npm run build:extension`.
For Chrome you can go to `chrome://extensions/` and enable developer mode, then click on "Load unpacked" and select the `build/chrome` folder.
For Firefox you can go to `about:debugging#/runtime/this-firefox` and click on "Load Temporary Add-on..." and select the `build/manifest.json` file.

## What permissions does this extension require?

This extension requires the following permissions:
- `storage` - This is used to store the items you want to import into DnDBeyond. This also allows it to extract the item from Griffon Saddlebag.
- `activeTab` - This is used to get the current tab url so that it can check if you are on Griffon Saddlebag or DnDBeyond.
- `scripting` - This is used to inject scripts into the Griffon Saddlebag and DnDBeyond pages so that it can extract and fill in the forms.

## What data does this extension collect?

This extension does not collect any data. It does not send any data to any servers.

## What does the host_permissions section in the manifest.json do?

This is used to allow the extension to inject scripts into the Griffon Saddlebag and DnDBeyond pages so that it can extract and fill in the forms.

## What should I do if I find a bug?

Please open an issue on the GitHub page for this extension.

## What should I do if I want to request a feature?

Please open an issue on the GitHub page for this extension.

## What should I do if I want to contribute?

Please open a pull request on the GitHub page for this extension.

### Available Scripts

In the project directory, you can run:

#### `npm run build`

Builds the extension for production to the `build` folder.\
It uses craco to override the webpack config to build specific scripts under specific names so that we can\
run them later with executeScript.

#### `run:firefox`

Opens up firefox on Griffon Saddlebag and runs the extension from the `build` folder.

#### `run:chrome`

Opens up chrome on Griffon Saddlebag and runs the extension from the `build` folder.

#### `build:extension`

Builds the extension for both firefox and chrome using `web-ext`.
