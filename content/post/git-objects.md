+++
title       = "Git Objects"
date        = 2018-09-12T16:10:16+08:00
draft       = true
tags        = ['Git']
toc         = 'true'
pinned      = 'false'
description = '''
Article has not summary.
'''
+++

# Git Object Database

A git repository is essentially a key-value database, where the value is a git
object and the key is a SHA-1 value which is is assigned to each value when
firstly added into the database.




# 4 Kinds Of Git Objects

__TL;DR__

1. A **tree** (like directories in file systems) as a directory save metadata and
   address (the SHA-1 keys) to contained **blob** objects as well as sub-trees.

2. A **commit** references to a root tree object as well as metadata the
   commit. It represents a backed history of the working tree. That is why git
   is called by someone as a file system.

3. **Reference** can be seen as the human friendly version of hash keys that
   git provides for user to reference to objects (e.g. commits) with special
   meanings. Using references is like declaring a constant variable in
   programming to store a fixed magic number (the hash values).

## Blob

All files (no matter what format it has) you submit to git are stored as blobs
(binary large object 数据对象).

They all reside under `<your repo>/.git/objects/`. Take the path
`<yourrepo>/.git/objects/fe/287a3e58d3d65a47e82f521b11df80ed2e540f` for
example, the `/fe/` directory represents the first 2 hash digits of all blobs
stored under this folder, the `287a3e58d3d65a47e82f521b11df80ed2e540f` is the
blob hash value (with the prefixing 2 digits `fe` stripped off).

Use the `git hash-object` plumbing command to pack files into blobs as well as
assigning a SHA-1 value as the key, then add the key-value pairs into database.

The blobs can be inspected by the `git cat-file` plumbing command.

## Tree



## Commit


## References
