# Lens database tables light

This document will highlight the tables we will push to GCS with a brief description:

# Sorted Document Entries

## dune.lens.namespace_handle
- This holds the handle information note handles and profiles are 2 different NFTs. A handle has its own ID.

## dune.lens.namespace_handle_link
You link your handle to your profile and this holds the reference of the link.

## dune.lens.profile_follower
- This holds who follows who.

## dune.lens.profile_follow_module
- This holds any follow module the profile has turned on.

## dune.lens.profile_follow_module_record
- This holds any follow module which has been redeemed by another profile aka 0x01 pays to follow 0x02.

## dune.lens.profile_metadata
- This holds the profile metadata again If it does not pass metadata standards, it goes into the metadata_failed table. This holds stuff like name, bio etc.

## dune.lens.profile_record
- This table holds the base profile information; this does not hold the handle, as that is a different table.

## dune.lens.publication_metadata
- This holds the publication content/metadata in.

## dune.lens.publication_open_action_module
- This holds the modules which have been attached to a publication.

## dune.lens.publication_open_action_module_acted_record
- This holds which profiles have acted on that publication (collects are a part of an act).

## dune.lens.publication_open_action_module_multirecipient
- This holds a line for each recipient who gets paid out by the multi-collect module.

## dune.lens.publication_record
- This holds all the SUCCESSFUL publication records, including Momoka publications; it also has a MIRROR|QUOTE|COMMENT|POST publication type, but the rest of the cols should explain itself. The definition of success to us is if it follows the metadata standard.

## dune.lens.publication_reference_module
- This holds any reference modules which have been attached to a publication.

## dune.lens.publication_reaction
- This holds the reaction type and who did.
