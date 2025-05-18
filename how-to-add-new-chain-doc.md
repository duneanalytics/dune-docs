---
title: Adding a New Chain
description: Step-by-step guide to generate documentation for a new blockchain.
---

# Generating Dune Docs for a New Chain

### Prerequisites
- Familiarity with [Mintlify](https://mintlify.com/docs/quickstart) documentation.
- [Dune Docs repo](https://github.com/duneanalytics/dune-docs) and GitHub setup are already completed.

---

## Instructions

### For EVM Chains

1. **Copy an Existing Chain’s Folder**
   - Navigate to `data-catalog -> evm -> abstract`.
   - Copy and paste the `abstract` folder.

2. **Rename the Folder**
   - Rename the copied folder to the name of the new chain (e.g., `unichain`).

3. **Replace References to the Original Chain**
   - Perform a mass replace of the old chain’s name with the new chain’s name (e.g., replace "abstract" with "unichain").

4. **Edit the Overview Page**
   - Update `overview.mdx` with information on the new chain.
   - Use the chain’s documentation and tools like ChatGPT to craft a similar overview page that aligns with Dune Docs’ style.

5. **Generate Table Previews**
   - Use the `hot-docs` repository ([link here](https://github.com/0xBoxer/hot-docs/tree/main)) and run the `show_table_preview.py` script to generate table previews for the new chain.
   - If needed, request access to the `hot-docs` repo from Florian.

6. **Sanity Check**
   - Run `mintlify dev` and check the docs locally at `https://localhost:3000/` to ensure everything displays correctly.

---

### For Non-EVM Chains

1. **Copy an Existing Chain’s Folder**
   - Navigate to `data-catalog -> stellar`.
   - Copy and paste the `stellar` folder.

2. **Rename the Folder**
   - Rename the copied folder to the new chain’s name (e.g., `sui`).

3. **Replace References to the Original Chain**
   - Perform a mass replace of the old chain’s name with the new chain’s name (e.g., replace "stellar" with "sui").

4. **Add New Table Files**
   - Non-EVM chains may have custom tables that require new files. Create these as necessary.

5. **Generate Table Schemas and Column Definitions**
   - Use the `hot-docs` repo ([link here](https://github.com/0xBoxer/hot-docs/tree/main)) and follow the steps to run the `hot-docs-custom-pipeline.py` script for generating table schemas and column definitions.
   - Request access to the `hot-docs` repo from Florian if needed.

6. **Generate Table Previews**
   - Use the `show_table_preview.py` script in `hot-docs` to generate table previews.