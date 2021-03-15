# Workspace Description Service

> This service provides the name and description of the workspace.

## Related Projects

 - https://github.com/space-work/review-service
 - https://github.com/space-work/amenities-service
 - https://github.com/space-work/contact-widget-service
 - https://github.com/space-work/workspace-service
 - https://github.com/space-work/location-service
 - https://github.com/space-work/workspace-description-service
 - https://github.com/space-work/photos-service
 - https://github.com/space-work/nearby-workspaces

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Mongo 4.4.1

## Development

First time set up:

Run seeding scripts (mongo must be installed and running)
```
npm run seed
```

Start server
```
npm run server:dev
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

# WeWork Workspace Descriptions API

### GET
#### All Workspaces
    '/api/workspace-descriptions'
#### By ID
    '/api/workspace-descriptions/:id'

### POST
    '/api/add'
    expects a JSON object in this shape:
    {
        "id": 5,
        "name": "Roof party",
        "url": "roof-party",
        "descriptionHeadline": "Something Even Newer",
        "description": "Roof party post-ironic 3 wolf moon, truffaut 90's ennui health goth. +1 master cleanse you probably haven't heard of them sriracha bespoke, thundercats kale chips quinoa. Godard neutra chillwave, air plant pok pok slow-carb post-ironic biodiesel la croix sriracha. Salvia shoreditch heirloom asymmetrical, copper mug lumbersexual kogi messenger bag waistcoat locavore. Tbh normcore drinking vinegar meh, shabby chic ethical 90's. Ramps pickled freegan try-hard pour-over. Cronut next level portland, deep v occupy organic microdosing.. Roof party post-ironic 3 wolf moon, truffaut 90's ennui health goth. +1 master cleanse you probably haven't heard of them sriracha bespoke, thundercats kale chips quinoa. Godard neutra chillwave, air plant pok pok slow-carb post-ironic biodiesel la croix sriracha. Salvia shoreditch heirloom asymmetrical, copper mug lumbersexual kogi messenger bag waistcoat locavore. Tbh normcore drinking vinegar meh, shabby chic ethical 90's. Ramps pickled freegan try-hard pour-over. Cronut next level portland, deep v occupy organic microdosing."
    }

### PUT
    '/api/update'
    expects two objects: an id of the item to change, objects with the fields to change
    for example:
    {
        {"id": 71},
        {"name": "Remodeled Roof",
         "url": "remodeled-roof"
        }   
    }

### DELETE
    '/api/delete/:id'
    
    Simply make a DELETE with the id attached to the url:
    '/api/delete/4725'


