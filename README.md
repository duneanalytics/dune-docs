### Getting started

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

You can now preview your documentation at [http://localhost:3000](http://localhost:3000)

### Making Changes

You can make changes to the documentation by editing the .mdx files in their respective folders. The changes will be reflected in the preview.

For specific syntax and formatting guides, refer to the mintlify documentation [here](https://mintlify.com/docs).

### Publishing Changes

If you have made changes to the documentation and want to publish them, submit a pull request to the main branch.   

**Please always allow [edits by maintainers](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the docs maintainers can work with your PR.** 
 
Once the pull request is merged, the changes will be automatically published to the documentation website.

### Adding New Pages

To add a new page to the documentation, create a new .mdx file in the folder where you want the page to be. Then, add the following to the `mint.json` file:

```json
{
  "routes": [
    {
      "path": "/new-page",
      "component": "./new-page.mdx"
    }
  ]
}
```

Replace `new-page` with the name of the file you created.


### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json`



Mintlify provides additional functionality to help maintain your documentation.

### Broken links

If you have broken links in your documentation, you can use the `mintlify` CLI to find them. Run the following command at the root of your documentation (where mint.json is)

```
mintlify broken-links
```

This will output a list of broken links in the console.

This functionality does not work for href links, be especially careful while defining these. 
### Renaming files

If you rename a file in your documentation, you can use the `mintlify` CLI to update the links in your documentation. Run the following command at the root of your documentation.

```
mintlify rename-file <old-file-name> <new-file-name>
```

This is a global search and replace, so it will update all the links in your documentation to the new file name. It helps to avoid broken links.
