+++
title       = "GitHub Credential Types"
date        = 2018-09-06T02:34:27+08:00
draft       = true
tags        = ['GitHub']
toc         = 'true'
pinned      = 'false'
description = '''
GitHub API provides quite a few endpoints, each of which represents a concrete
operation that can be requested to perform on GitHub backing database. However
different operations can only be performed on behalf of different roles, hence
there are 3 kinds of credentials representing 3 different roles involved in
GitHub API.
'''
+++

# 3 Roles

__OAuth App Owner__ The one who registered the app as GitHub OAuth app in the
[New OAuth App page]. After the registration, the owner will get a key and
secret (a.k.a. client ID and client secret) pair which identifying the
registered app in GitHub. Often they are kept on the company's server.

__OAuth App User__ The app's end users, they need to provide their GitHub
account credentials, that is a username+password pair, in order to login to
GitHub service.

__OAuth App__ Instead of directly using username+password to request any
operation from GitHub, GitHub OAuth apps use [GitHub OAuth Authorization API]
to request access tokens and use them to access most part of GitHub resources.




# The problem of username and password credential

__It belongs to user, not the app__ The username and password identities a user
to GitHub while a user may have more than one GitHub OAuth apps, each of which
should own their own credentials to GitHub.

__It is unrestricted__ The username and password credential grants app with
unlimited permissions to access all informations of the user which is overkill
in most cases. User should be able to specify which area of resources (scopes)
can be accessed by the given app as well as revoking it.

__The 2 factor authentication inconvenience__ If user enabled [2FA] feature,
each operation would require an extra authorization code. The acquiring of
authorization code is non-trivial, and the code expires shortly, hence it is
not fit for most API requesting scenarios.

# Grants And Authorizations

In GitHub API, a grant represents that a OAuth app is authorized to access a
user's resources. But a OAuth app can request more than one access tokens to
access different scopes of a user's resources. Hence a grant contains a group
of authorizations (each corresponds to an access token).

Each grant represents a combination of user and app.

Each access token represents a combination of user, app and scopes.

# Roles And Credentials

For most of user operations, use access token as credential is enough.

For some authorization related operation (i.e. operations applied to access
tokens or unrelated to specific app), need to use username and password
credential type.

Some operation need to be performed by OAuth app owner (on the server side),
use key and secret as credential.

| Role          | Authorization Header                           |
| ------------: | :--------------------------------------------- |
| User          | Authorization: Basic base64(username:password) |
| App Owner     | Authorization: Basic base64(key:secret)        |
| Authorization | Authorization: Token base64(token)             |

# Example: Delete vs. Revoke

I was confused by these 2 groups of endpoints when I learn the GitHub API
documentation.

They both accomplish the same task - Invalidating the given authorization /
grant. The difference is the they require different credential types:

- The delete endpoints require username and password, which implies these
  endpoints are provided for end users.

- The revoke endpoints require key and secret, which implies these endpoints
  are provided for company servers.


[New OAuth App page]: https://github.com/settings/applications/new
[2FA]: https://en.wikipedia.org/wiki/Multi-factor_authentication
[GitHub OAuth Authorization API]: https://developer.github.com/v3/oauth_authorizations
