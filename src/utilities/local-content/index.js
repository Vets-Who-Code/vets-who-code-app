export const contenfulData = {
  nextCohort: {
    metadata: {
      tags: [],
    },
    sys: {
      space: {
        sys: {
          type: 'Link',
          linkType: 'Space',
          id: 'pkudqip5irxk',
        },
      },
      id: '3HvWnResWFMUET1k2bjWDy',
      type: 'Entry',
      createdAt: '2022-03-02T20:20:19.245Z',
      updatedAt: '2022-03-02T20:20:19.245Z',
      environment: {
        sys: {
          id: 'develop',
          type: 'Link',
          linkType: 'Environment',
        },
      },
      revision: 1,
      contentType: {
        sys: {
          type: 'Link',
          linkType: 'ContentType',
          id: 'nextCohort',
        },
      },
      locale: 'en-US',
    },
    fields: {
      nextCohortSartDate: '2022-03-31T00:00-06:00',
      nextCohort: 'Next Cohort',
    },
  },
  blogPost: {
    sys: {
      type: 'Array',
    },
    total: 9,
    skip: 0,
    limit: 100,
    items: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '7Aht5BBRTx1YCDGcD3StRQ',
          type: 'Entry',
          createdAt: '2021-10-31T03:27:51.277Z',
          updatedAt: '2021-10-31T03:27:51.277Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'The API Series - Part 1: An Intro to APIs',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '1zrHwCMucFhB1MFIX34fKa',
              type: 'Entry',
              createdAt: '2021-10-31T03:20:52.969Z',
              updatedAt: '2021-10-31T03:20:52.969Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Nathan B Hankes',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '6fVdtkrXC0tRrWXHpxPBp0',
                  type: 'Asset',
                  createdAt: '2021-10-31T03:20:47.356Z',
                  updatedAt: '2021-10-31T03:20:47.356Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'Nathan B Hankes',
                  description: '',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/6fVdtkrXC0tRrWXHpxPBp0/5d3665f1d33397957a045d175acedfa6/nathan-Hankes.jpeg',
                    details: {
                      size: 17919,
                      image: {
                        width: 320,
                        height: 320,
                      },
                    },
                    fileName: 'nathan-Hankes.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-10-30T00:00-04:00',
          slug: 'the-api-series-part-1-an-intro-to-apis',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'APIs are the workhorse of modern web development. They put the "A" in JAMstack. And knowing how to work with them is a requirement for a career in frontend web development.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#what-is-an-api',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'What Is An API',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-2',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "API stands for Application Programming Interface. An API's function is to relay information, requests, and responses between two or more programs or machines.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "An example of an API you might need to use one day is Stripe. Stripe is a software company that creates software that processes online payments. They have developed the Stripe API, which allows any developer on the planet to interact with Stripe's payment processing software.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'By using the ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://stripe.com/docs/api',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Stripe API',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ', you can add payment processing functionality to a website without possessing that specific area of software and banking expertise.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Sometimes an API simply provides access to a third-party database. An example of this would be the ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://www.programmableweb.com/api/open-eangtin-database-rest-api',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Open EAN/GTIN Database API',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ', which allows you to access product information based on barcode details.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Some APIs allow you to add to a database. An example of this is the ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://developer.twitter.com/en/docs/twitter-api',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Twitter API',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: ', which allows you to add Twitter posts to your feed via the API.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'The core similarity is that an API allows you to interact with software that you did not write and machines and data that you do not own.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#types-of-apis',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'Types of APIs',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-2',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "In this tutorial we are focusing on web service APIs. These are APIs that are designed to pass information between machines over networks like the internet, but there can also be local APIs. can be structured differently, which affects how you interact with, or consume, the API. So it's important to know about the common types.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#rest',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'REST',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-3',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'By far the most common since 2000, the REST, or RESTful, API is one that conforms to the constraints of the REST architectural style and allows for interaction with RESTful web services. REST stands for representational state transfer. By working within a set of architectural constraints, the RESTful APIs provide consistency to all developers. The reason RESTful APIs are so common is that they offer a standardized methodology for making requests to an API. So once a developer works with one REST API, other REST APIs are going to function in a similar way. If you want a career in frontend web development, learn to master consuming RESTful APIs.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#graphql',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'GraphQL',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-3',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'An emerging API type, GraphQL API data is presented as a schema, which can be viewed by developers within the GraphiQL development environment. Frontend developers use the GraphQL query language to consume the data, providing the frontend, or client, with only the necessary data. Since this is an emerging technology, it is important to learn to consume GraphQL APIs.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#soap',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'SOAP',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-3',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'SOAP APIs are an older format, and you might encounter them when working on a legacy project. This tutorial will not cover SOAP APIs, though there are plenty of resources available online should you run into a SOAP API in your career.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#xmlrpc-json-rpc',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'XML-RPC / JSON RPC',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-3',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'These API types are older. Both follow a strict format that developers can rely on. One uses XML, and the other uses JSON data.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode/the-api-series-part-1-an-intro-to-apis-1bd#api-access',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: 'API Access',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-2',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Some APIs are public. Some APIs require a developer key, which functions as an authorization protocol allowing access. These keys are acquired when registering with the API provider.\nFor example, Stripe requires a developer key so they know who is transferring money! Also, since some APIs charge for use, this is a way of tracking usage.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "As a rule, it's highly recommended to keep your keys private. If someone else uses your key, you could get charged for their activity! Here is a good article on keeping your API keys secure: ",
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://www.freecodecamp.org/news/how-to-securely-store-api-keys-4ff3ea19ebda/',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Best Practices For Securely Storing API Keys',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Follow for future posts on how to consume RESTful and GraphQL APIs.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '1hZqZCS1i0KZBCKJua26fz',
              type: 'Asset',
              createdAt: '2021-10-31T03:27:41.070Z',
              updatedAt: '2021-10-31T03:27:41.070Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'API Series PT One',
              description: '',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/1hZqZCS1i0KZBCKJua26fz/e2ceabc15a1ff555f6cecc53ba00afae/api-1.webp',
                details: {
                  size: 33582,
                  image: {
                    width: 1000,
                    height: 420,
                  },
                },
                fileName: 'api-1.webp',
                contentType: 'image/webp',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '3zxKSztw2TgeeFodY5ayEt',
          type: 'Entry',
          createdAt: '2021-10-31T03:11:32.862Z',
          updatedAt: '2021-10-31T03:13:16.591Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 2,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'A Virtual Volunteer Experience',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '7ohlfkU3Cc9CRhDyT6kweg',
              type: 'Entry',
              createdAt: '2021-10-31T03:11:22.058Z',
              updatedAt: '2021-10-31T03:11:22.058Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Schuster Braun',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '1v45pV0oOLrerK6C5y8Hqp',
                  type: 'Asset',
                  createdAt: '2021-10-31T03:04:57.451Z',
                  updatedAt: '2021-10-31T03:04:57.451Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'Schuster Braun',
                  description: '',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/1v45pV0oOLrerK6C5y8Hqp/9711c4acc117172ff979f887ba151da8/sb.jpeg',
                    details: {
                      size: 13881,
                      image: {
                        width: 320,
                        height: 320,
                      },
                    },
                    fileName: 'sb.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-10-30T00:00-04:00',
          slug: 'a-virtual-volunteer-experience',
          body: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'This past weekend I volunteered at ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    data: {
                      uri: 'https://twitter.com/seattlegivecamp',
                    },
                    content: [
                      {
                        nodeType: 'text',
                        value: 'Seattle Give Camp',
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                  {
                    nodeType: 'text',
                    value: '(SGC) with ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    data: {
                      uri: 'https://twitter.com/VetsWhoCode',
                    },
                    content: [
                      {
                        nodeType: 'text',
                        value: '#VetsWhoCode',
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                  {
                    nodeType: 'text',
                    value: '(VWC) where ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    data: {
                      uri: 'https://twitter.com/semperfried76',
                    },
                    content: [
                      {
                        nodeType: 'text',
                        value: 'Eddie Prislac',
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                  {
                    nodeType: 'text',
                    value: ' and I helped the ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    data: {
                      uri: 'https://twitter.com/NavySEALfnd',
                    },
                    content: [
                      {
                        nodeType: 'text',
                        value: 'Navy SEAL Foundation',
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                  {
                    nodeType: 'text',
                    value:
                      '(NSF) with their application. I wanted to talk about the experience of my first fully virtual hackathon.',
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: "Eddie and I took NSF's WordPress site and fixed one of their plugins (",
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    data: {
                      uri: 'https://github.com/classy-org/classy-org-wp',
                    },
                    content: [
                      {
                        nodeType: 'text',
                        value: 'Classy',
                        marks: [],
                        data: {},
                      },
                    ],
                  },
                  {
                    nodeType: 'text',
                    value:
                      ") and got it so it could display data from their backend API. The idea for the plugin is to track fundraising campaigns for the nonprofit. The issue with Classy was that it really didn't display enough information that would add value to the app. So we put together a proposal they could take to their board for alternatives that would be more in line with what they wanted to do. Secondly, we finalized testing their app for the Google Play Store and got it to the review stage for the Store, which was a fairly straightforward process.",
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "What took the most time was submitting to the Apple Store. There were multiple credentials that needed to be set up, multiple Apple products needed to be owned, and the errors provided by Apple to help troubleshoot the process were a nightmare. We eventually got it successfully submitted. The downside was Apple came back rather quickly and let us know that because the app didn't use Apple hardware APIs there was no reason for it to be distributed on their app store. Not a complete loss since the app was a PWA but definitely a bummer.",
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "I've done a few hackathons in my time. I've found some of them can be real stinkers. For me here are some key indicators for a successful hackathon.",
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Just like at your regular dev job ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'project requirements need to be clear',
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value:
                      ". For example, sometimes you'll be working with a non-profit and their answer to all your questions are along the lines of:\n",
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Them: "I need an app"\nMe: "What kind of app?"\nThem: "An app with all the data."\nMe: "Okay, can I have access to data."\nThem:...\n',
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'In that last part, there is a ghost. Also, the opposite of this is scope creep hell.',
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Another bummer at hackathons is ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'the lack of expertise',
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value:
                      '. Sometimes no one at the event has the expertise to help solve your technical problem. You end up spending an entire weekend trying to get your stupid Gatsby Webpack set up to build and end up building a SPA from scratch using plain JS (which helps no one).',
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "Thirdly, I find that there's quite a bit of downtime during hackathons so being ",
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'able to socialize',
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value:
                      ' is key. This is mostly due to working on rather small projects with a number of folks so we end up blocking each other on a number of things. So, being able to walk around and mingle with other teams for me is huge. It keeps me engaged in the event.',
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: "Lastly, it's important for the event to actually be ",
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'administered well',
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value:
                      ". I'm throwing a bunch of stuff into this bucket: ticketing, tech working, announcements not taking forever, sticking to the agenda, keeping folks engaged and accountable throughout the experience.",
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "My synopsis of Seattle Give Camp, 10/10 great experience. They did a ton of leg work with the non-profits to clarify their asks and keep them goal-oriented. There were a number of subject matter experts on WordPress there, which is the tech that most Non-profits are running and need help with. It was nice not to feel blocked by alien tech working in a weird way. Furthermore, never having used Microsoft Teams myself I was hesitant to be excited about a weekend of teams. But honestly, it was such a smooth experience to have our own workspace for files, chats, and breakout rooms. There would have been a lot more confusing setup required to get that same functionality for the Google Suite. In the end, you can tell it was run by pros and the quality really showed. I was impressed by how all the teams were able to deliver great solutions over the course of the weekend. I'm really happy I went and would recommend it to others as a way to help non-profits with their tech skills.",
                    marks: [],
                    data: {},
                  },
                ],
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "I think in the end though I still prefer in-person hackathons over virtual. It's nice to be able to hang out and have fun with folks. I think no matter what over the internet there is a level of disconnection. I'm in my house you're where you are. I don't know if virtual will ever solve for that. But in the times of Covid, I think virtual does the job.",
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '6IcVn7kBMIcMZIfDMmw1SI',
              type: 'Asset',
              createdAt: '2021-10-31T03:11:13.787Z',
              updatedAt: '2021-10-31T03:11:13.787Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Volunteer Virtual',
              description: '',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/6IcVn7kBMIcMZIfDMmw1SI/021ce8ad83874b311fb602379f7a7b65/volunteering-virtually.jpeg',
                details: {
                  size: 9394839,
                  image: {
                    width: 5882,
                    height: 3993,
                  },
                },
                fileName: 'volunteering-virtually.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: 'y1MGeW9trrIJ5t5Jm9kj1',
          type: 'Entry',
          createdAt: '2021-10-31T02:49:43.739Z',
          updatedAt: '2021-10-31T02:49:43.739Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'VetsWhoCode Extension Pack',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '5WzALIagpcj1fqXpkRWZL8',
              type: 'Entry',
              createdAt: '2021-10-31T02:49:36.469Z',
              updatedAt: '2021-10-31T02:49:36.469Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Adrian Grimm',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '6syiJbXUKzusIKi1mvIfVE',
                  type: 'Asset',
                  createdAt: '2021-10-31T02:47:22.459Z',
                  updatedAt: '2021-10-31T02:47:22.459Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'Adrian Grimm',
                  description: '',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/6syiJbXUKzusIKi1mvIfVE/98321a946ff1b0ca4a43dffb6d0d1e7b/adrian.png',
                    details: {
                      size: 66943,
                      image: {
                        width: 403,
                        height: 476,
                      },
                    },
                    fileName: 'adrian.png',
                    contentType: 'image/png',
                  },
                },
              },
            },
          },
          publishedDate: '2021-10-30T00:00-04:00',
          slug: 'vetswhocode-extension-pack',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Vets Who Code is a non-profit organization providing veterans with software development training. As part of the training, the students set up their development environment, including VS Code. Most students are not aware of the available extensions they could use and they receive a list to install from the marketplace.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Realizing there must be a better way, we built a VS Code plugin to flatten the productive learning curve. This plugin is an extension pack filled with common extensions used in the training program. We asked for feedback from the VetsWhoCode community, and added the most common extensions into the plugin.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'The value in using this plugin is the time saved getting new veterans up and running. The troops install the extension pack, increasing the amount of instructional time. This translates to a faster transition into writing software.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'The ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://marketplace.visualstudio.com/items?itemName=VetsWhoCode.vetswhocode-extension-pack',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'VetsWhoCode Extension Pack',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ' contains the following extensions:\n-Alphabetical Sorter\n-Axe Accessibility Linter\n-Bookmarks\n-CSS Peek\n-DotEnv\n-Drawio\n-ESLint\n-GitBlame\n-GitLens\n-JavaScript Booster\n-LiveServer\n-Markdown All in One\n-Path-Intellisense\n-Prettier\n-Quokka\n-React-VSCode-Extension-Pack\n-Sort JSON objects\n-Thunder Client\n-VSCode-Dash\n-VSLiveShare Pack',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "We are always open to more feedback and grateful to those who support us in our learning and building journey. Don't hesitate to provide feedback or ideas via GitHub discussions. Our open-source extension pack can be found ",
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://github.com/Vets-Who-Code/vetswhocode-extension-pack',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'here',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: '.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '4H6weU3H4gA8SORh4ZRwYX',
              type: 'Asset',
              createdAt: '2020-05-08T13:40:33.744Z',
              updatedAt: '2020-05-08T13:40:33.744Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'vwc-logo',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/4H6weU3H4gA8SORh4ZRwYX/c6e7ca3a3d69cb326903716150f5d8b6/vwc-logo.jpeg',
                details: {
                  size: 18318,
                  image: {
                    width: 500,
                    height: 277,
                  },
                },
                fileName: 'vwc-logo.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '5UUZjKhQzLueSIU89vWCzX',
          type: 'Entry',
          createdAt: '2021-08-07T19:10:30.105Z',
          updatedAt: '2021-08-07T19:10:30.105Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'The Top 5 Things You Need to Know to Be Successful as a Junior Developer',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2U5pS0WnWtd2dUoYX9ZXKA',
              type: 'Entry',
              createdAt: '2021-01-22T03:56:42.727Z',
              updatedAt: '2021-01-22T03:56:42.727Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-08-07T00:00-04:00',
          slug: 'the-top-5-things-you-need-to-know-to-be-successful-as-a-junior-developer',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'With a crazy market that is hungry for mid and senior developers but super competitive for juniors, being successful to get your first job requires far more than JavaScript knowledge — you’ll also need to practice and strengthen a variety of nontechnical skills.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Whether you’re currently trying to land your first position as a junior developer or preparing to start the job hunt, breaking into the field can be more than a little intimidating. Here’s a list of five insights we’ve compiled to make your life a little easier as a junior JavaScript developer.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '1) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Ask for Help',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'The longer you work as a developer, the more you’ll realize how little you really know. Never be afraid to look up a term or concept you’re not familiar with, and never be afraid to ask your more senior co-workers for assistance. Getting answers to your questions is to everyone’s benefit because it makes you a better employee.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Beyond asking questions, there are several ways you can receive help as a junior developer. Pair programming with more experienced developers is an excellent way to learn the ropes at an organization and to find out about useful tools and techniques. You can also ask your colleagues to do a code review of your work in order to receive some constructive criticism.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '2) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Show Initiative',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Your employer will hire and train you for a given role, which may not correspond exactly with what you’ve learned so far. As a junior developer, you should accept that you may not always be able to work on your projects of choice.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'However, this doesn’t mean that you shouldn’t continue to look out for your own interests. You’ll likely have many different employers over the course of your career, each one requiring a distinct skill set. If you’re not currently in your ideal position, work on yourself by learning talents and technologies for the job you want. A great way to do this is by starting side projects that you can push to production and showcase on your resume.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '3) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Keep Learning',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Although you may have been hired as a junior developer, learning new concepts will give you a better chance of rising up the ranks. There’s always another skill to grasp that will benefit you in your work, from how to write better code to how to communicate your ideas effectively.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Online, you’ll find a wealth of resources, articles, and videos that can help you learn advanced JavaScript techniques and libraries. You can even watch screencasts on websites like Twitch that show people writing code in real-time. Contributing to open-source software projects is another great way to keep your skills sharp and help out the programming community.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '4) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Find a Mentor',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Even when you’re working as part of a team, being a junior developer can be a bewildering and sometimes isolating experience. To counteract these problems, find a good technical mentor who can provide advice about your work and help guide you along your career trajectory.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Mentors can come in many forms, from both inside and outside your organization. If it’s one of your co-workers or connections, the relationship often develops organically as you get to know each other better. You can also find external mentors at programming conferences and meetings, where they can give advice on topics such as job interviews and the state of the industry.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '5) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Don’t Give Up',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Patience and determination are two of the successful web developer’s greatest virtues. Waiting for tests to complete, learning a new framework, and fixing a nasty bug all require a serious amount of tenacity and a high tolerance for frustration.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'However, it’s important to realize that you’ll get better just by showing up every day. Whether it’s learning to ride a bike or learning to code, nothing worthwhile can be achieved without a lot of sweat and hard work — so be prepared to take chances, make mistakes, and stick to it.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '6bfSBDvpPgHHRgr9W4Gohb',
              type: 'Asset',
              createdAt: '2021-08-07T19:10:16.982Z',
              updatedAt: '2021-08-07T19:10:16.982Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'success',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/6bfSBDvpPgHHRgr9W4Gohb/02f3ce74fd5fb785d49defea075a38c7/successful.jpeg',
                details: {
                  size: 7057417,
                  image: {
                    width: 5669,
                    height: 3780,
                  },
                },
                fileName: 'successful.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '5UXWqsLLdoW2E0V00pvNCA',
          type: 'Entry',
          createdAt: '2021-08-07T19:00:53.699Z',
          updatedAt: '2021-08-07T19:00:53.699Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Code Bootcamp Tips For Rookies',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2U5pS0WnWtd2dUoYX9ZXKA',
              type: 'Entry',
              createdAt: '2021-01-22T03:56:42.727Z',
              updatedAt: '2021-01-22T03:56:42.727Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-08-07T00:00-04:00',
          slug: 'code-bootcamp-tips-for-rookies',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'We have our final cohort wrapping up at ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://vetswhocode.io/',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '#VetsWhoCode',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      " before we swtich to an Learning Management System Model and it got me to thinking of some of the things I've seen over the last five years and how to best set the newbies up for success, so I started sharing little nuggets of wisdom. I felt like some of these were universal to all coding bootcamps, not just ours, so I wanted to share these with you guys in hopes that it helps a newbie make the best out of their quest to get paid for playing on their computer all day.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '1) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Empty your cup',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ". That's an old Bruce Lee saying that basically means to not let your past experiences block your learning from new ones.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "Many times people come into these programs after a few attempts of trying to learn on their own or maybe you did some market research and you think that since you are spending money you have a stake in the curriculum (troops don't pay at VWC, but I've heard horror stories from for-profit instructors having to drastically amend things in order to save a few students). Either way you're coming in armed with a bunch of information that while you think voicing your opinion about is gonna make the class better, more often than not it's actually going to slow the class down and annoy everyone. Focus on learning and then applying what you learned first, then if its burning you up ask for some one-on-one time with the instructor to share your thoughts, but remember that there are some other things in place as to why the teacher does it that way ,from work experience to legal reasons.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '2) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: "Ask questions if you don't understand something",
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      '. Not just to the instructor, but your mentor and fellow students as well. There are tons of ways to learn and everyone has something to share ( well, most people do ). So if you have a question, ask someone and try to get it broken down to bare bones if you can.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '3) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Get a f*cking mentor',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ". This stuff is hard y'all. Thinking about doing this alone is going to just make you miserable and discourage you early on. Find someone that you like personally that also has the skills you want to acquire and ask them if they will mentor you. Be proactive by letting them know how many times a week you are looking for and what areas you are looking to step up in. I wanted to be better in UX, Teaching and Speaking so I reached out to acquire ",
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://twitter.com/billyhollis?lang=en',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Billy Hollis',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ' as a mentor ( Mission Accomplished!). You should find people who will shore up your game to make it easier to get where they are, faster.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '4) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Create',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ". I've been doing this long enough to see with my own two eyes that those who received the most opportunities were those who constantly produced content, be it codepens, videos, working projects in their portfolio, blog posts, etc. What you lack in experience can be made up for by showcasing a constant drive to learn and share what you've learned to others. It's the difference between it taking forever to get your first job and getting a mid-level web dev job as your first job.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '5) ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Build relationships and use them',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ". Everyone is the sum of their relationships. I once had two troops in the same cohort. While I care for most of my troops equally ( one of two, eh ) one was clearly the superior talent compared to the other, but the other constantly produced content, built relationships, networked, showcased their skills every chance they got in their community, while the other expected his GitHub and portfolio to do the talking. While it took the superior developer a much longer time to get his first job, the one focusing on both hard skills and soft skills had his first dev job three days after graduating, moved on to be a tech instructor at another non-profit, was promoted and threw his first conference in the same timeframe. Whether it's Twitter, meetups, or just offering to Uber them coffee for a 1:1 meeting ( I did this, it works), building key relationships is integral in any business, and the current business is you get a job coding. Programming is social and none of us are in a bubble. You're writing code for people, be it the user or the person next to you or in the same slack channel 1000 miles away, so act like it and meet someone in the industry.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2GjOcrXNDwpIL0alDWKFun',
              type: 'Asset',
              createdAt: '2021-08-07T19:00:41.595Z',
              updatedAt: '2021-08-07T19:00:41.595Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Coding For Beginners',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/2GjOcrXNDwpIL0alDWKFun/f64f04458495c50f98975eb7552cb91a/coding-for-rookies.jpeg',
                details: {
                  size: 4493366,
                  image: {
                    width: 3888,
                    height: 3000,
                  },
                },
                fileName: 'coding-for-rookies.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '22KlRt9QC9h8YOTejjAN1o',
          type: 'Entry',
          createdAt: '2021-01-22T04:03:03.092Z',
          updatedAt: '2021-01-22T16:00:46.092Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 2,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Transferring Knowledge Between Careers',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2U5pS0WnWtd2dUoYX9ZXKA',
              type: 'Entry',
              createdAt: '2021-01-22T03:56:42.727Z',
              updatedAt: '2021-01-22T03:56:42.727Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-01-21T00:00-06:00',
          slug: 'transferring-knowledge-between-careers',
          body: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'embedded-asset-block',
                content: [],
                data: {
                  target: {
                    metadata: {
                      tags: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: 'Link',
                          linkType: 'Space',
                          id: 'pkudqip5irxk',
                        },
                      },
                      id: '2fxdMcFj2QpZy6TMeBEhpP',
                      type: 'Asset',
                      createdAt: '2021-01-22T04:00:21.263Z',
                      updatedAt: '2021-01-22T04:00:21.263Z',
                      environment: {
                        sys: {
                          id: 'develop',
                          type: 'Link',
                          linkType: 'Environment',
                        },
                      },
                      revision: 1,
                      locale: 'en-US',
                    },
                    fields: {
                      title: 'knowledge transfer',
                      description: 'sketch about knowledge transfer',
                      file: {
                        url: '//images.ctfassets.net/pkudqip5irxk/2fxdMcFj2QpZy6TMeBEhpP/207970ccb7a8820f0db353e7f44639e0/knowledge-transfer.png',
                        details: {
                          size: 357359,
                          image: {
                            width: 1280,
                            height: 720,
                          },
                        },
                        fileName: 'knowledge-transfer.png',
                        contentType: 'image/jpeg',
                      },
                    },
                  },
                },
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "For the past six years, I have had the pleasure of meeting many people who are trying to jump-start a new career in programming from an old one that isn't tech-focused. As a result, they tend to disparage everything that they learned in their first career as useless. That is the furthest from the truth. Your early career taught you valuable things that you can leverage in interviews and your day-to-day work. Let's go over some of the soft skills that many jobs teach you that translate well into working as a programmer.",
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'heading-2',
                content: [
                  {
                    nodeType: 'text',
                    value: 'Processes',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Ever have to work in fast food? I did, a long time ago. To this day, I remember the steps it took to make a taco from Taco Bell. I remember placing the taco shell on the wrapping paper, placing the beef into the shell, adding lettuce, then sprinkling cheese sparingly on top ( always got yelled at for overdoing cheese). I would then wrap and place it in a bag to give to the customer. Because of the processes that I learned, I could consistently make quality food repeatedly promptly. ',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: "I've used this same soft skill working on Vets Who Code. I  go to our ",
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'main',
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: ' branch, and type ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'git pull --rebase',
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value:
                      ' to get the most up-to-date changes in the order Team members added them, then type ',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value: 'git checkout -b WHATEVER_I_NAME_BRANCH',
                    marks: [
                      {
                        type: 'code',
                      },
                    ],
                    data: {},
                  },
                  {
                    nodeType: 'text',
                    value:
                      ' then I get to work. Doing this helps me get to work on new features on our website while ensuring that I minimize the risk of merge conflicts.',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "We call this soft skill process. It's a series of actions or steps taken to achieve a particular end. Whether it's with tacos or with the starting steps of a new branch on processes are everywhere, and needed to do our job well. One thing I did while learning to code was I documented the techniques I made for myself that helped me understand and how I retained what I learned. Doing this gave me something to speak to recruiters and hiring managers about that showcased how I thought even though I didn't have much experience. For you, being able to leverage your knowledge with processes, build your own and be able to speak about them to people with whom you want to work will showcase that even if you're new, you're taking the craft of programming seriously.",
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'heading-2',
                content: [
                  {
                    nodeType: 'text',
                    value: 'Critical Thinking',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'You know one of the things I heard the most as an enlisted veteran? That we only take orders. That we don\'t "think outside the box". Well, I challenge anyone who thinks that way to walk a day in the shoes of any active duty troop overseas, and you\'ll learn that it\'s "fake news" fast. Critical thinking is a skill applied in many ways and doesn\'t always show itself in the most obvious method. ',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "Let's go back to my time at Taco Bell. There was a day during our peak hours when all the power went out in about four blocks. The only thing that worked was the fryer.  So now, with more people coming to the store cause they couldn't cook and customers that were already in line, there was a way this could have gotten bad quick. There is nothing scarier than hungry hot people. But this young woman I worked with she had a brilliant idea. She started frying Cinnamon Twists and Empanadas and handing them out along with apologies. So I stepped in, offering drinks to those who could pay cash. Soon everyone was joyful, and the tension had deceased, and people were happy in a situation that they really shouldn't have been. Once the power came on, people ordered food, called friends, and had a more significant peak hour than usual. Monday, a letter from the CEO came in thanking us for handling it, and we received raises, although she deserved all the credit. It was that fast problem-solving and critical thinking that led two sixteen-year-olds to successfully manage a rush of angry customers that any leader would want on their team when the web app has an outage, and you need to get it back up as soon as possible. Being able to pull stories like this from your prior experiences to showcase your fast thinking and showcase how you would apply it to your new career is a great way to let your future coworkers know that they can trust you to be in the trenches with them when things don't go as planned.",
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'heading-2',
                content: [
                  {
                    nodeType: 'text',
                    value: 'Teamwork',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      "While sounding cliche, showcase that you know what it feels like to work as a team speaks volumes. While people don't believe it, the most stressful thing you can have at work is people who don't know the value of teamwork. That means pulling communicating thoughtfully and being respectful, building trust, and showing up to do your part consistently to help the goal to move forward. Thankfully, as a military background, I don't have to work too hard to let hiring managers know my ability to work with a team.\n",
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'These are but a few ways I have learned over time to transfer the skills I had in other jobs to technology interviews. The soft skills, the habit stacking, the methods you use to learn new things, those things still matter. All you have to do is take a hard look at your experiences and pull out the parts that serve you the best.',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
            ],
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2fxdMcFj2QpZy6TMeBEhpP',
              type: 'Asset',
              createdAt: '2021-01-22T04:00:21.263Z',
              updatedAt: '2021-01-22T04:00:21.263Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'knowledge transfer',
              description: 'sketch about knowledge transfer',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/2fxdMcFj2QpZy6TMeBEhpP/207970ccb7a8820f0db353e7f44639e0/knowledge-transfer.png',
                details: {
                  size: 357359,
                  image: {
                    width: 1280,
                    height: 720,
                  },
                },
                fileName: 'knowledge-transfer.png',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '5q3T3NcXFIUrg9YUMBQIOW',
          type: 'Entry',
          createdAt: '2020-05-08T13:48:08.310Z',
          updatedAt: '2020-05-08T13:48:08.310Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'The Teams Of #VetsWhoCode',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2wSf0WFCB2culp3KJwjltz',
              type: 'Entry',
              createdAt: '2020-05-08T13:38:36.074Z',
              updatedAt: '2020-05-08T13:38:36.074Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2020-05-07T00:00-05:00',
          slug: 'the-teams-of-vetswhocode',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "As many of you know, we are unique in our process in that we don't charge our troops any money to learn from us at Vets Who Code. But that does not mean we are free. ",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Our veterans contribute by giving back to the community and by helping the organization by showcasing and using the skills we taught them in their everyday work lives and as mentors.  Using a threefold solution, our veterans get continued experience, constant support and motivation, and a team environment that makes all of VWC better.  Here are some of the teams that make VWC work.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Prework',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "Led by a brilliant, very surly Marine, the prework team is the tip of our spear. It's the MEPS of VetsWhoCode in which you have to get through them to even get to our training. They decide who gets into VetsWhoCode by one metric - doing the work. As a free program, we make sure that every member goes through the prework to get into the cohort. It's our way of seeing who is serious and who is just playing with the idea of becoming a programmer.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Education',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "To me, this is an essential team, as we can't create any other group without them being trained by the Education team first. The Education team, or EDU, is the team that teaches the cohorts. What makes this team unique from other programs is that they are all not only veterans and programmers but former alumni that have gotten jobs through VWC.  No one knows how tough a challenge is better than people who have been through it and succeeded.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Code pen',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'If EDU is the most important, Codepen is my most fun. They are my rockstars, my special teams. They only have one mission: make eye-catching stuff for the web on ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://codepen.io/vetswhocode',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: '',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://codepen.io/vetswhocode',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'codepen',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ". It's usually around a subject and at least once a month, but when they debut their Codepen project, we're generally always featured, or picked pen. It's still a hit in the community and a great source of outreach for VetsWhoCode.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Product',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "Our most reliable troops end up on the product team. Their job is to make the web app better continually. Our web app stack is the exact stack that they learn in the cohort ( we train what we know ).  The ramping up is minimal, but their work is appreciated. It's the only place where a couple of lines of code can be super impactful.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Tutorials',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'The tutorials team is new, and they are kind of like our DevRel team. They have to know how to code but also how to write well enough to get their ideas across. This team is at the same level as the codepen team in regards to impact and exposure. You can view their work on our ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://dev.to/vetswhocode',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'dev.to',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: ' blog. I am excited to see what these troops can do.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Mentorship',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'The mentorship team is the only team that outside programmers and civilians can join.  If you have been programming for a year and want to give back, this is where you need to be. You have to be a programmer with production-level experience in JavaScript with at least a year of experience and have a willingness to meet with your assigned troop at least twice a week.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'This Team of Teams is how we run VetsWhoCode, like a finely tuned operation that focuses on sectorized units with a front sight focus on their goals and projects. Not much different than the military, just on the internet.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '1Lh3iKSnw0qHrzjmaLqHb2',
              type: 'Asset',
              createdAt: '2020-05-08T13:47:58.211Z',
              updatedAt: '2020-05-08T13:47:58.211Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'teams',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/1Lh3iKSnw0qHrzjmaLqHb2/3b1d934abdf588e4634b46d423f29d88/teams.jpeg',
                details: {
                  size: 5133957,
                  image: {
                    width: 5800,
                    height: 4134,
                  },
                },
                fileName: 'teams.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '4TNPhwmNijrIGiqFhVWIjC',
          type: 'Entry',
          createdAt: '2020-05-08T13:46:04.688Z',
          updatedAt: '2020-05-08T13:46:04.688Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: '#GivingTuesdayNow',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2wSf0WFCB2culp3KJwjltz',
              type: 'Entry',
              createdAt: '2020-05-08T13:38:36.074Z',
              updatedAt: '2020-05-08T13:38:36.074Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2020-05-05T00:00-05:00',
          slug: 'givingtuesdaynow',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'In these unusual times we have to stick together to come up with new, innovative ways to help veterans and double down on the methods that we know are working. ',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Due COVID-19 displacing education prospects for many veterans wanting to learn how to program due to the many code schools not able to certify those who weren’t previously enrolled, or they are simply looking for a higher quality of community that is focused on the goal of learning how to code, we have had an unprecedented amount of veterans and military spouses reach out to us for help to #RetoolRetrainRelaunch their careers to the future proof and for many of us coding at home, pandemic proof industry of coding. As such we are ramping up even more services and building more resources for veterans everywhere, regardless of admission. We recently started a  tutorial team that is building out educational resources for veterans on dev.to and we are revving up our media channel for live-streaming on youtube and podcasting to keep veterans engaged and informed.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Our troops have really stepped up to the plate. They are helping each other solve challenges, working together to build apps, deep diving in section of our curriculum to make themselves stronger devs, all while still handling the stress of day-to-day operations of being parents and workers during this unprecedented time.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'This #GivingTuesdayNow we are asking you for a tax-deductible donation that will help us scale up resources even faster to support more veterans.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '4H6weU3H4gA8SORh4ZRwYX',
              type: 'Asset',
              createdAt: '2020-05-08T13:40:33.744Z',
              updatedAt: '2020-05-08T13:40:33.744Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'vwc-logo',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/4H6weU3H4gA8SORh4ZRwYX/c6e7ca3a3d69cb326903716150f5d8b6/vwc-logo.jpeg',
                details: {
                  size: 18318,
                  image: {
                    width: 500,
                    height: 277,
                  },
                },
                fileName: 'vwc-logo.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '44g7g2fy8lJ4QALzbR1eN',
          type: 'Entry',
          createdAt: '2020-05-08T13:41:10.267Z',
          updatedAt: '2020-05-08T13:41:10.267Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'blogPost',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Vets Who Code: What, Where, And How to Help',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2wSf0WFCB2culp3KJwjltz',
              type: 'Entry',
              createdAt: '2020-05-08T13:38:36.074Z',
              updatedAt: '2020-05-08T13:38:36.074Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2020-04-14T00:00-05:00',
          slug: 'vets-who-code-what-where-and-how-to-help',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'When I started this journey ',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'SIX',
                    nodeType: 'text',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ' years ago, I just wanted to create an affordable solution for veterans to transition into the workforce as fast as they can without the hurdles of civilian life of trying to find a code school that accepts the GI Bill. I didn’t want my fellow troops in transition to fall through the cracks, like I did.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'That’s why I went into the nonprofit sector in the first place. I wanted to help my brothers and sisters. What I found was a system designed, not to help them, but, to get as much money out of donors, sponsors and government agencies as possible by telling the story of how the nation fails our servicemen and women; all the while creating extremely high requirements, yet, having extremely low benchmarks for success. Did you know that unless you are actually sleeping on the streets in some states you aren’t considered homeless? Meaning, if you are living out of your car, living out of a hotel room, or couch-surfing, you don’t qualify for certain support services.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'I should know — I’ve had the great displeasure of doing all three. Despite the adversity, perseverance enabled me to climb out of the darkness, with a deep desire to keep other veterans from falling into the abyss. Thinking back, that was the hardest six months of my life! It was development and design that helped me get through those tough times, not the current nonprofit sector filled with relics that have cozy relationships all the while doing the minimum.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'I spent every waking moment learning skills that other people were either too stubborn or just too fearful to learn, and it added value to me — value the civilian sector could understand. Then, when a fallen soldier’s family needed help, my newly minted value empowered me to answer the call to bury a brother. Afterwards, I was like “what do I do next?” — leading to the stupid idea of turning something old (a freaking castle!) into something new, repurposing it to retrain veterans in real and digital skillsets. Unfortunately that didn’t work. But, out of it came true inspiration, something revamped, brilliant, and functional — something I hope would even make David Heinemeier Hansson (my hero) proud.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'What is Vets Who Code?',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Vets Who Code is a veteran founded, lead and operated 501(c)(3) distributed charitable non-profit, dedicated to filling the wide chasm between technical expertise needed and available with transitioning veterans and active duty military spouses through software development training and education. We utilize our distributed model for the capability to train veterans anywhere, but we are so much more. We are a team of people with hybrid tech skills and a lean mentality, focused on helping veterans not only learn how to program, but get jobs in the field and to do it without the unnecessary bloat that other nonprofits take on. From UX and DevOPs engineers to little old me, who got thrown into this because I simply wanted to help my fellow veterans, which is the most important part of this nonprofit. Currently 80% of the team is veterans, and we provide what you need to surpass our successes and learn from our mistakes. ’Cause if we are to celebrate this thing called life, we need to be there together.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'Why Code?',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Great question. Right now our country has a problem: we have programming jobs, but not enough programmers. Not only that, we don’t have enough GOOD programmers. On top of that, while it’s definitely better, veterans are still the highest unemployed demographic in America. So we had this crazy idea. What if we created a vetted curriculum designed around modern technologies? Not just any veterans, those who this skill could really impact. Not only that, let’s work tirelessly to mentor them in professional standards of code, business, and design. Can you imagine how much better you get at design thinking when the guy speaking has been thinking about it every day for the last 15 years? We then thought, what if we added tools to continue learning after you’ve dealt with us for 15 weeks? Our partners like Frontend Masters and Google Cloud give us amazing tools to gift the veterans so that they can learn and prep for up to a year. Not only that — we make introductions, and train them in the interview process to help them get jobs in the industry. You know what? It works. Our troops have been getting highly paid positions, and we couldn’t be happier. Here we empower amazing people to have the lifestyle they have earned, and we do it all online; a feat that wasn’t even possible 10 years ago.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [
                      {
                        type: 'bold',
                      },
                    ],
                    value: 'How Can You Help?',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'That’s actually a question we get quite often. Our veterans spend 15 weeks with our team focusing on the language JavaScript and and all it encompasses, and understanding software architecture and computer science fundamentals. We focus on having workflows, interview questions, computer science, and UX research.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'The most important thing you can do to support our mission is ',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://donorbox.org/vetswhocode-donation',
                    },
                    content: [
                      {
                        data: {},
                        marks: [
                          {
                            type: 'bold',
                          },
                        ],
                        value: 'donate',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value:
                      ". As a 501(c)(3) we are tax-deductible, and as a distributed non-profit, we don't have any wasteful operating cost. All proceeds go directly to resources and cool things for the troops.",
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'If you’re a software engineer with at least two years experience working with ES6 and Javascript, sign up as a mentor. If you are a designer who can code, we are always looking for someone to help us with our user experience. If you are in HR, drop us a line in our contact form, so that we can get our troops into your pipeline for javascript jobs.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '4H6weU3H4gA8SORh4ZRwYX',
              type: 'Asset',
              createdAt: '2020-05-08T13:40:33.744Z',
              updatedAt: '2020-05-08T13:40:33.744Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'vwc-logo',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/4H6weU3H4gA8SORh4ZRwYX/c6e7ca3a3d69cb326903716150f5d8b6/vwc-logo.jpeg',
                details: {
                  size: 18318,
                  image: {
                    width: 500,
                    height: 277,
                  },
                },
                fileName: 'vwc-logo.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
    ],
    includes: {
      Entry: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '1zrHwCMucFhB1MFIX34fKa',
            type: 'Entry',
            createdAt: '2021-10-31T03:20:52.969Z',
            updatedAt: '2021-10-31T03:20:52.969Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Nathan B Hankes',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '6fVdtkrXC0tRrWXHpxPBp0',
                type: 'Asset',
                createdAt: '2021-10-31T03:20:47.356Z',
                updatedAt: '2021-10-31T03:20:47.356Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'Nathan B Hankes',
                description: '',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/6fVdtkrXC0tRrWXHpxPBp0/5d3665f1d33397957a045d175acedfa6/nathan-Hankes.jpeg',
                  details: {
                    size: 17919,
                    image: {
                      width: 320,
                      height: 320,
                    },
                  },
                  fileName: 'nathan-Hankes.jpeg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2U5pS0WnWtd2dUoYX9ZXKA',
            type: 'Entry',
            createdAt: '2021-01-22T03:56:42.727Z',
            updatedAt: '2021-01-22T03:56:42.727Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Jerome Hardaway',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '2Tguu2sRwvI12twQlAji1X',
                type: 'Asset',
                createdAt: '2020-05-08T13:38:28.818Z',
                updatedAt: '2020-05-08T13:38:28.818Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'jerome-medium',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                  details: {
                    size: 10906,
                    image: {
                      width: 240,
                      height: 240,
                    },
                  },
                  fileName: 'jerome-medium.jpeg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2wSf0WFCB2culp3KJwjltz',
            type: 'Entry',
            createdAt: '2020-05-08T13:38:36.074Z',
            updatedAt: '2020-05-08T13:38:36.074Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Jerome Hardaway',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '2Tguu2sRwvI12twQlAji1X',
                type: 'Asset',
                createdAt: '2020-05-08T13:38:28.818Z',
                updatedAt: '2020-05-08T13:38:28.818Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'jerome-medium',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                  details: {
                    size: 10906,
                    image: {
                      width: 240,
                      height: 240,
                    },
                  },
                  fileName: 'jerome-medium.jpeg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '5WzALIagpcj1fqXpkRWZL8',
            type: 'Entry',
            createdAt: '2021-10-31T02:49:36.469Z',
            updatedAt: '2021-10-31T02:49:36.469Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Adrian Grimm',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '6syiJbXUKzusIKi1mvIfVE',
                type: 'Asset',
                createdAt: '2021-10-31T02:47:22.459Z',
                updatedAt: '2021-10-31T02:47:22.459Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'Adrian Grimm',
                description: '',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/6syiJbXUKzusIKi1mvIfVE/98321a946ff1b0ca4a43dffb6d0d1e7b/adrian.png',
                  details: {
                    size: 66943,
                    image: {
                      width: 403,
                      height: 476,
                    },
                  },
                  fileName: 'adrian.png',
                  contentType: 'image/png',
                },
              },
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '7ohlfkU3Cc9CRhDyT6kweg',
            type: 'Entry',
            createdAt: '2021-10-31T03:11:22.058Z',
            updatedAt: '2021-10-31T03:11:22.058Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Schuster Braun',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '1v45pV0oOLrerK6C5y8Hqp',
                type: 'Asset',
                createdAt: '2021-10-31T03:04:57.451Z',
                updatedAt: '2021-10-31T03:04:57.451Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'Schuster Braun',
                description: '',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/1v45pV0oOLrerK6C5y8Hqp/9711c4acc117172ff979f887ba151da8/sb.jpeg',
                  details: {
                    size: 13881,
                    image: {
                      width: 320,
                      height: 320,
                    },
                  },
                  fileName: 'sb.jpeg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
        },
      ],
      Asset: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '1Lh3iKSnw0qHrzjmaLqHb2',
            type: 'Asset',
            createdAt: '2020-05-08T13:47:58.211Z',
            updatedAt: '2020-05-08T13:47:58.211Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'teams',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/1Lh3iKSnw0qHrzjmaLqHb2/3b1d934abdf588e4634b46d423f29d88/teams.jpeg',
              details: {
                size: 5133957,
                image: {
                  width: 5800,
                  height: 4134,
                },
              },
              fileName: 'teams.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '1hZqZCS1i0KZBCKJua26fz',
            type: 'Asset',
            createdAt: '2021-10-31T03:27:41.070Z',
            updatedAt: '2021-10-31T03:27:41.070Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'API Series PT One',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/1hZqZCS1i0KZBCKJua26fz/e2ceabc15a1ff555f6cecc53ba00afae/api-1.webp',
              details: {
                size: 33582,
                image: {
                  width: 1000,
                  height: 420,
                },
              },
              fileName: 'api-1.webp',
              contentType: 'image/webp',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '1v45pV0oOLrerK6C5y8Hqp',
            type: 'Asset',
            createdAt: '2021-10-31T03:04:57.451Z',
            updatedAt: '2021-10-31T03:04:57.451Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Schuster Braun',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/1v45pV0oOLrerK6C5y8Hqp/9711c4acc117172ff979f887ba151da8/sb.jpeg',
              details: {
                size: 13881,
                image: {
                  width: 320,
                  height: 320,
                },
              },
              fileName: 'sb.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2GjOcrXNDwpIL0alDWKFun',
            type: 'Asset',
            createdAt: '2021-08-07T19:00:41.595Z',
            updatedAt: '2021-08-07T19:00:41.595Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Coding For Beginners',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/2GjOcrXNDwpIL0alDWKFun/f64f04458495c50f98975eb7552cb91a/coding-for-rookies.jpeg',
              details: {
                size: 4493366,
                image: {
                  width: 3888,
                  height: 3000,
                },
              },
              fileName: 'coding-for-rookies.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2Tguu2sRwvI12twQlAji1X',
            type: 'Asset',
            createdAt: '2020-05-08T13:38:28.818Z',
            updatedAt: '2020-05-08T13:38:28.818Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'jerome-medium',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
              details: {
                size: 10906,
                image: {
                  width: 240,
                  height: 240,
                },
              },
              fileName: 'jerome-medium.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2fxdMcFj2QpZy6TMeBEhpP',
            type: 'Asset',
            createdAt: '2021-01-22T04:00:21.263Z',
            updatedAt: '2021-01-22T04:00:21.263Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'knowledge transfer',
            description: 'sketch about knowledge transfer',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/2fxdMcFj2QpZy6TMeBEhpP/207970ccb7a8820f0db353e7f44639e0/knowledge-transfer.png',
              details: {
                size: 357359,
                image: {
                  width: 1280,
                  height: 720,
                },
              },
              fileName: 'knowledge-transfer.png',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '4H6weU3H4gA8SORh4ZRwYX',
            type: 'Asset',
            createdAt: '2020-05-08T13:40:33.744Z',
            updatedAt: '2020-05-08T13:40:33.744Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'vwc-logo',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/4H6weU3H4gA8SORh4ZRwYX/c6e7ca3a3d69cb326903716150f5d8b6/vwc-logo.jpeg',
              details: {
                size: 18318,
                image: {
                  width: 500,
                  height: 277,
                },
              },
              fileName: 'vwc-logo.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '6IcVn7kBMIcMZIfDMmw1SI',
            type: 'Asset',
            createdAt: '2021-10-31T03:11:13.787Z',
            updatedAt: '2021-10-31T03:11:13.787Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Volunteer Virtual',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/6IcVn7kBMIcMZIfDMmw1SI/021ce8ad83874b311fb602379f7a7b65/volunteering-virtually.jpeg',
              details: {
                size: 9394839,
                image: {
                  width: 5882,
                  height: 3993,
                },
              },
              fileName: 'volunteering-virtually.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '6bfSBDvpPgHHRgr9W4Gohb',
            type: 'Asset',
            createdAt: '2021-08-07T19:10:16.982Z',
            updatedAt: '2021-08-07T19:10:16.982Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'success',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/6bfSBDvpPgHHRgr9W4Gohb/02f3ce74fd5fb785d49defea075a38c7/successful.jpeg',
              details: {
                size: 7057417,
                image: {
                  width: 5669,
                  height: 3780,
                },
              },
              fileName: 'successful.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '6fVdtkrXC0tRrWXHpxPBp0',
            type: 'Asset',
            createdAt: '2021-10-31T03:20:47.356Z',
            updatedAt: '2021-10-31T03:20:47.356Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Nathan B Hankes',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/6fVdtkrXC0tRrWXHpxPBp0/5d3665f1d33397957a045d175acedfa6/nathan-Hankes.jpeg',
              details: {
                size: 17919,
                image: {
                  width: 320,
                  height: 320,
                },
              },
              fileName: 'nathan-Hankes.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '6syiJbXUKzusIKi1mvIfVE',
            type: 'Asset',
            createdAt: '2021-10-31T02:47:22.459Z',
            updatedAt: '2021-10-31T02:47:22.459Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Adrian Grimm',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/6syiJbXUKzusIKi1mvIfVE/98321a946ff1b0ca4a43dffb6d0d1e7b/adrian.png',
              details: {
                size: 66943,
                image: {
                  width: 403,
                  height: 476,
                },
              },
              fileName: 'adrian.png',
              contentType: 'image/png',
            },
          },
        },
      ],
    },
  },
  podcast: {
    sys: {
      type: 'Array',
    },
    total: 3,
    skip: 0,
    limit: 100,
    items: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '65t7UrdNteKheefEmj6wwC',
          type: 'Entry',
          createdAt: '2021-08-07T19:53:55.692Z',
          updatedAt: '2021-08-07T19:53:55.692Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'podcast',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Front End Happy Hour |  Severless - serving(less) drinks',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2U5pS0WnWtd2dUoYX9ZXKA',
              type: 'Entry',
              createdAt: '2021-01-22T03:56:42.727Z',
              updatedAt: '2021-01-22T03:56:42.727Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-08-07T00:00-04:00',
          slug: 'front-end-happy-hour-or-severless-serving-less-drinks',
          body: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                  {
                    data: {
                      uri: 'https://open.spotify.com/embed/episode/543XoFSyzFZuntFhC4d1LZ',
                    },
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Podcast',
                        nodeType: 'text',
                      },
                    ],
                    nodeType: 'hyperlink',
                  },
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Do you remember the days of FTP? In this episode, we are joined by Jerome Hardaway to talk with us about the changes made to hosting websites and how serverless has improved the ways we serve up websites and applications.',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Picks',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'heading-2',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://serverless.css-tricks.com/',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Serverless - CSS Tricks',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.netflix.com/title/80057918',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Lucifer',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.amazon.com/The-Boys-Season-2/dp/B08C8NJQSH',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'The Boys Season 2',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.netflix.com/title/81292974',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: "Chef's Table BBQ",
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.mixelcocktails.com/',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Mixel cocktail app',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://open.spotify.com/track/5gx6DzU69FWhz8RGn2zWXQ?si=CJDRKJLoSY2Yj2Y4r9I8KQ',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value:
                                  'Sukhe Phool - Max Cooper Firefly Remix by Yorkston/Thorne/Khan, Max Cooper',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://open.spotify.com/track/7bxHVCYpHpMn0PJEb2SwQq?si=YZkgachKQu2ZNT0ZSrxHPA',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Back to the Sky by Ólafur Arnalds',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://fallguys.com/',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Fall Guys',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.youtube.com/watch?v=EBSdyoO3goc',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Intro to AWS Lambda and Serverless Apps ',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.day-lite.com/product-page/the-original-daylite-window',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Valley Silicon: Fake window',
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                          {
                            data: {
                              uri: 'https://www.amazon.com/Worlds-Toughest-Race-Eco-Challenge-Fiji-Season/dp/B08BB8S8FJ',
                            },
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: "World's toughest race",
                                nodeType: 'text',
                              },
                            ],
                            nodeType: 'hyperlink',
                          },
                          {
                            data: {},
                            marks: [],
                            value: '',
                            nodeType: 'text',
                          },
                        ],
                        nodeType: 'paragraph',
                      },
                    ],
                    nodeType: 'list-item',
                  },
                ],
                nodeType: 'unordered-list',
              },
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: '',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: 'RN5G0YVhSUuKAJP9dZHoh',
              type: 'Asset',
              createdAt: '2021-08-07T19:53:41.483Z',
              updatedAt: '2021-08-07T19:53:41.483Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'fehh',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/RN5G0YVhSUuKAJP9dZHoh/77d4b89acce251c775cd5b3bae468df1/fehh.jpeg',
                details: {
                  size: 129391,
                  image: {
                    width: 1727,
                    height: 1727,
                  },
                },
                fileName: 'fehh.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '1bNNBb7KCRmRjqqxHsW6qf',
          type: 'Entry',
          createdAt: '2021-08-05T19:19:00.044Z',
          updatedAt: '2021-08-05T19:19:00.044Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'podcast',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Introducing The HashFlag Nation Podcast',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2wSf0WFCB2culp3KJwjltz',
              type: 'Entry',
              createdAt: '2020-05-08T13:38:36.074Z',
              updatedAt: '2020-05-08T13:38:36.074Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-08-01T00:00-04:00',
          slug: 'introducing-the-hashflag-nation-podcast',
          body: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'I want to be the first to introduce you to the relaunch of our podcast, named HashFlag Nation, after our logo the HashFlag. On this podcast we are going to have conversations with troops, mentors, and supporters alike on how to transition into software engineering from the military, updates on what we are building, as well as hearing from troops,guests, and team members. I want to take the time to say thank you for your support.',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    content: [
                      {
                        nodeType: 'text',
                        value: 'Podcast',
                        marks: [],
                        data: {},
                      },
                    ],
                    data: {
                      uri: 'https://open.spotify.com/embed/episode/4ENfdN4j5ScabXCCkgXX04',
                    },
                  },
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
            ],
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '3dssVKD4g0yUlNL2ISupV2',
              type: 'Asset',
              createdAt: '2021-08-05T19:18:38.395Z',
              updatedAt: '2021-08-05T19:18:38.395Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Hashflag Nation',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/3dssVKD4g0yUlNL2ISupV2/a1bd07b66e525b277293a5423cc6c815/whitegrid_podcast__1_.png',
                details: {
                  size: 1509720,
                  image: {
                    width: 1080,
                    height: 1080,
                  },
                },
                fileName: 'whitegrid podcast (1).png',
                contentType: 'image/png',
              },
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '1IfwIPRJzNtC4eef3FFIug',
          type: 'Entry',
          createdAt: '2021-07-31T18:48:54.422Z',
          updatedAt: '2021-08-01T19:28:38.878Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 5,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'podcast',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Jerome Hardaway On Syntax',
          author: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2U5pS0WnWtd2dUoYX9ZXKA',
              type: 'Entry',
              createdAt: '2021-01-22T03:56:42.727Z',
              updatedAt: '2021-01-22T03:56:42.727Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'author',
                },
              },
              locale: 'en-US',
            },
            fields: {
              authorName: 'Jerome Hardaway',
              authorImage: {
                metadata: {
                  tags: [],
                },
                sys: {
                  space: {
                    sys: {
                      type: 'Link',
                      linkType: 'Space',
                      id: 'pkudqip5irxk',
                    },
                  },
                  id: '2Tguu2sRwvI12twQlAji1X',
                  type: 'Asset',
                  createdAt: '2020-05-08T13:38:28.818Z',
                  updatedAt: '2020-05-08T13:38:28.818Z',
                  environment: {
                    sys: {
                      id: 'develop',
                      type: 'Link',
                      linkType: 'Environment',
                    },
                  },
                  revision: 1,
                  locale: 'en-US',
                },
                fields: {
                  title: 'jerome-medium',
                  file: {
                    url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                    details: {
                      size: 10906,
                      image: {
                        width: 240,
                        height: 240,
                      },
                    },
                    fileName: 'jerome-medium.jpeg',
                    contentType: 'image/jpeg',
                  },
                },
              },
            },
          },
          publishedDate: '2021-07-31T00:00-04:00',
          slug: 'jerome-hardaway-on-syntax',
          body: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'embedded-asset-block',
                content: [],
                data: {
                  target: {
                    metadata: {
                      tags: [],
                    },
                    sys: {
                      space: {
                        sys: {
                          type: 'Link',
                          linkType: 'Space',
                          id: 'pkudqip5irxk',
                        },
                      },
                      id: '4Vkr3bm2slqP50pyyYsyIH',
                      type: 'Asset',
                      createdAt: '2021-07-31T18:48:13.798Z',
                      updatedAt: '2021-07-31T18:48:13.798Z',
                      environment: {
                        sys: {
                          id: 'develop',
                          type: 'Link',
                          linkType: 'Environment',
                        },
                      },
                      revision: 1,
                      locale: 'en-US',
                    },
                    fields: {
                      title: 'syntax',
                      file: {
                        url: '//images.ctfassets.net/pkudqip5irxk/4Vkr3bm2slqP50pyyYsyIH/e4b6ef624fc35c9cc14e02f1b5de8bcf/Syntax-Podcast.jpeg',
                        details: {
                          size: 167904,
                          image: {
                            width: 800,
                            height: 500,
                          },
                        },
                        fileName: 'Syntax-Podcast.jpeg',
                        contentType: 'image/jpeg',
                      },
                    },
                  },
                },
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'In this episode of Syntax, Scott and Wes talk with Jerome Hardaway about web dev, vets who code, diversity in tech, and more!',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {},
                  },
                  {
                    nodeType: 'hyperlink',
                    content: [
                      {
                        nodeType: 'text',
                        value: 'Podcast',
                        marks: [],
                        data: {},
                      },
                    ],
                    data: {
                      uri: 'https://open.spotify.com/embed/episode/76IOqt5crjviAywS3EdwiI',
                    },
                  },
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: 'Guests Jerome Hardaway Show Notes 01:50 - Captain America of Tech',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '03:25 - Where do you work and what type of stuff do you work on?',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '08:03 - What was your introduction to programming?',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '15:46 - When did you start Vets Who Code?',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '24:13 - What is the stack behind Vets Who Code?',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '29:56 - How do you help prep vets to get jobs?',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '41:32 - How can you be an ally and amplify black voices in tech?',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: '50:05 - Everybody against racism',
                    marks: [],
                    data: {},
                  },
                ],
                data: {},
              },
            ],
          },
          featureImage: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '4Vkr3bm2slqP50pyyYsyIH',
              type: 'Asset',
              createdAt: '2021-07-31T18:48:13.798Z',
              updatedAt: '2021-07-31T18:48:13.798Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'syntax',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/4Vkr3bm2slqP50pyyYsyIH/e4b6ef624fc35c9cc14e02f1b5de8bcf/Syntax-Podcast.jpeg',
                details: {
                  size: 167904,
                  image: {
                    width: 800,
                    height: 500,
                  },
                },
                fileName: 'Syntax-Podcast.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
        },
      },
    ],
    includes: {
      Entry: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2U5pS0WnWtd2dUoYX9ZXKA',
            type: 'Entry',
            createdAt: '2021-01-22T03:56:42.727Z',
            updatedAt: '2021-01-22T03:56:42.727Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Jerome Hardaway',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '2Tguu2sRwvI12twQlAji1X',
                type: 'Asset',
                createdAt: '2020-05-08T13:38:28.818Z',
                updatedAt: '2020-05-08T13:38:28.818Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'jerome-medium',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                  details: {
                    size: 10906,
                    image: {
                      width: 240,
                      height: 240,
                    },
                  },
                  fileName: 'jerome-medium.jpeg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2wSf0WFCB2culp3KJwjltz',
            type: 'Entry',
            createdAt: '2020-05-08T13:38:36.074Z',
            updatedAt: '2020-05-08T13:38:36.074Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            contentType: {
              sys: {
                type: 'Link',
                linkType: 'ContentType',
                id: 'author',
              },
            },
            locale: 'en-US',
          },
          fields: {
            authorName: 'Jerome Hardaway',
            authorImage: {
              metadata: {
                tags: [],
              },
              sys: {
                space: {
                  sys: {
                    type: 'Link',
                    linkType: 'Space',
                    id: 'pkudqip5irxk',
                  },
                },
                id: '2Tguu2sRwvI12twQlAji1X',
                type: 'Asset',
                createdAt: '2020-05-08T13:38:28.818Z',
                updatedAt: '2020-05-08T13:38:28.818Z',
                environment: {
                  sys: {
                    id: 'develop',
                    type: 'Link',
                    linkType: 'Environment',
                  },
                },
                revision: 1,
                locale: 'en-US',
              },
              fields: {
                title: 'jerome-medium',
                file: {
                  url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
                  details: {
                    size: 10906,
                    image: {
                      width: 240,
                      height: 240,
                    },
                  },
                  fileName: 'jerome-medium.jpeg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
        },
      ],
      Asset: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2Tguu2sRwvI12twQlAji1X',
            type: 'Asset',
            createdAt: '2020-05-08T13:38:28.818Z',
            updatedAt: '2020-05-08T13:38:28.818Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'jerome-medium',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/2Tguu2sRwvI12twQlAji1X/61438b809f7e1a8c0a6c9a17ccbeb2b0/jerome-medium.jpeg',
              details: {
                size: 10906,
                image: {
                  width: 240,
                  height: 240,
                },
              },
              fileName: 'jerome-medium.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '3dssVKD4g0yUlNL2ISupV2',
            type: 'Asset',
            createdAt: '2021-08-05T19:18:38.395Z',
            updatedAt: '2021-08-05T19:18:38.395Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Hashflag Nation',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/3dssVKD4g0yUlNL2ISupV2/a1bd07b66e525b277293a5423cc6c815/whitegrid_podcast__1_.png',
              details: {
                size: 1509720,
                image: {
                  width: 1080,
                  height: 1080,
                },
              },
              fileName: 'whitegrid podcast (1).png',
              contentType: 'image/png',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '4Vkr3bm2slqP50pyyYsyIH',
            type: 'Asset',
            createdAt: '2021-07-31T18:48:13.798Z',
            updatedAt: '2021-07-31T18:48:13.798Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'syntax',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/4Vkr3bm2slqP50pyyYsyIH/e4b6ef624fc35c9cc14e02f1b5de8bcf/Syntax-Podcast.jpeg',
              details: {
                size: 167904,
                image: {
                  width: 800,
                  height: 500,
                },
              },
              fileName: 'Syntax-Podcast.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: 'RN5G0YVhSUuKAJP9dZHoh',
            type: 'Asset',
            createdAt: '2021-08-07T19:53:41.483Z',
            updatedAt: '2021-08-07T19:53:41.483Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'fehh',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/RN5G0YVhSUuKAJP9dZHoh/77d4b89acce251c775cd5b3bae468df1/fehh.jpeg',
              details: {
                size: 129391,
                image: {
                  width: 1727,
                  height: 1727,
                },
              },
              fileName: 'fehh.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
      ],
    },
  },
  boardMember: {
    sys: {
      type: 'Array',
    },
    total: 15,
    skip: 0,
    limit: 100,
    items: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '2DloF7gYuthpN7OZ9n8Ww8',
          type: 'Entry',
          createdAt: '2020-09-25T17:38:48.968Z',
          updatedAt: '2021-11-21T23:58:19.446Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Amanda',
          lastName: 'Casari',
          work: 'Google Cloud',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '7L4klRqZld3v1YcfwQB4Uw',
              type: 'Asset',
              createdAt: '2020-09-25T17:38:33.863Z',
              updatedAt: '2020-09-25T17:38:33.863Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Amanda Casari',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/7L4klRqZld3v1YcfwQB4Uw/303b3380a76a73fc856986f81270e047/amanda_casari.jpg',
                details: {
                  size: 15784,
                  image: {
                    width: 200,
                    height: 200,
                  },
                },
                fileName: 'amanda_casari.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/amcasari/',
          twitter: 'https://twitter.com/amcasari',
          bio: 'Amanda Casari is a Navy veteran who transitioned from the officer core into leading the charge of Open Source and Education at Google Cloud. ',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '5bfd6BCRX0wtiIPfyoGSsc',
          type: 'Entry',
          createdAt: '2020-09-25T17:42:49.827Z',
          updatedAt: '2021-11-22T00:17:47.309Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 7,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Chris M.',
          lastName: 'Christi',
          work: 'Calypso AI',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '7ICvhmnciFN1iORusaLsNc',
              type: 'Asset',
              createdAt: '2020-09-25T17:42:42.147Z',
              updatedAt: '2021-11-22T00:44:05.705Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 2,
              locale: 'en-US',
            },
            fields: {
              title: 'Chris Christi',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/7ICvhmnciFN1iORusaLsNc/ae060161a64330cf93d04549d89fb462/LI_Headshot.jpeg',
                details: {
                  size: 30276,
                  image: {
                    width: 490,
                    height: 490,
                  },
                },
                fileName: 'LI Headshot.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/chris-christi-394a191/',
          twitter: 'https://twitter.com/ChrisChristi1',
          bio: 'Chris began his career in technology as an Army Signal Officer serving in technology leadership positions both on active duty and National Guard. Chris has 20 years experience in sales, business development and leadership positions at innovative technology companies including Forcepoint, Veeam Software, Secure Computing, Dell and Now Calypso AI.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '6jQ50U72j8nYdi0NpQzoKr',
          type: 'Entry',
          createdAt: '2021-11-11T01:49:19.171Z',
          updatedAt: '2021-11-21T23:51:24.326Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 2,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Taylor',
          lastName: 'Desseyn',
          work: 'VACO',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: 'POuy6K4SHQNunyr1Ecu0i',
              type: 'Asset',
              createdAt: '2021-11-11T01:48:37.049Z',
              updatedAt: '2021-11-11T01:48:37.049Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Taylor Desseyn',
              description: '',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/POuy6K4SHQNunyr1Ecu0i/d855f3a373efc40a26964814bf9152c3/taylor.jpeg',
                details: {
                  size: 32836,
                  image: {
                    width: 400,
                    height: 400,
                  },
                },
                fileName: 'taylor.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/taylordesseyn/',
          twitter: 'https://twitter.com/tdesseyn',
          bio: 'Taylor leads one of the hottest recruiting teams for developers in the country. His focus on empathy and being a good person first keeps him in demand with both developers and engineering firms alike. ',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '7srEC6dicaEgEs8jXAdIDA',
          type: 'Entry',
          createdAt: '2020-09-25T17:36:34.761Z',
          updatedAt: '2021-11-22T00:01:31.886Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 5,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Paul',
          lastName: 'Ford',
          work: 'Postlight',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '3k0DWHVxP8j7NRyMdozBXg',
              type: 'Asset',
              createdAt: '2020-09-25T17:35:53.503Z',
              updatedAt: '2020-09-25T17:35:53.503Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Paul Ford',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/3k0DWHVxP8j7NRyMdozBXg/c302ad91f55fa08106905dd6b571e0d2/paul_ford.jpg',
                details: {
                  size: 13474,
                  image: {
                    width: 200,
                    height: 200,
                  },
                },
                fileName: 'paul_ford.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/ftrain/',
          twitter: 'https://twitter.com/ftrain',
          bio: 'Co-Founder of Postlight, a Digital Strategy company that focuses on JAMstack Technologies. Writer at Bloomberg and Wired.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '2KVxyJ2QF9smka6xjd8wfL',
          type: 'Entry',
          createdAt: '2020-09-25T17:33:14.287Z',
          updatedAt: '2021-11-22T00:19:12.208Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Brian',
          lastName: 'Holt',
          work: 'Stripe',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '59GlaHFopuLpUh3VedhsC2',
              type: 'Asset',
              createdAt: '2020-09-25T17:33:02.679Z',
              updatedAt: '2020-09-25T17:33:02.679Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Brian Holt',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/59GlaHFopuLpUh3VedhsC2/336c4f69c3c318b2c438df2b5f66874a/brian_holt.jpg',
                details: {
                  size: 8164,
                  image: {
                    width: 200,
                    height: 200,
                  },
                },
                fileName: 'brian_holt.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/btholt/',
          twitter: 'https://twitter.com/holtbt',
          bio: 'Brian is currently working as a product manager on dev tools at Stripe and he’s all about developers, developers, developers. Previously he was a JavaScript engineer at Netflix, Microsoft and Reddit. When not working, Brian finds time to teach on Frontend Masters, run his mouth on Front End Happy Hour, travel all over the world, and play with his adorable dog. Brian is currently a resident of Seattle, WA.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '7jXvZC2M2Oi1u3UQahibro',
          type: 'Entry',
          createdAt: '2020-09-25T17:25:45.428Z',
          updatedAt: '2021-11-22T00:23:11.821Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Anna',
          lastName: 'Lee',
          work: 'Director Of User Experience at Ryan',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '1YcWsR1gw9vV7KgV6LlJ5c',
              type: 'Asset',
              createdAt: '2020-09-25T17:25:27.827Z',
              updatedAt: '2020-09-25T17:25:27.827Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Anna Lee',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/1YcWsR1gw9vV7KgV6LlJ5c/100acf5839d9727bd2e35e1bf4e2fa1c/0.jpeg',
                details: {
                  size: 29477,
                  image: {
                    width: 400,
                    height: 400,
                  },
                },
                fileName: '0.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/annalee921/',
          bio: 'Anna is a Boston-based UX designer with a background in research and front-end web development. Anna is passionate about design systems, tackling complex user interfaces, and simplifying tasks that have traditionally been tedious and/or time-consuming. ',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '2iiQc9seQe7Xag3dcI83pa',
          type: 'Entry',
          createdAt: '2020-09-25T17:34:08.419Z',
          updatedAt: '2021-11-22T00:06:13.967Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Christina',
          lastName: 'Morillo',
          work: 'Trimarc Security',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '19HyYAJKxEbFf5QtVCS1Ps',
              type: 'Asset',
              createdAt: '2020-09-25T17:33:53.438Z',
              updatedAt: '2020-09-25T17:33:53.438Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Christina Morillo',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/19HyYAJKxEbFf5QtVCS1Ps/0007ebefa6bafd68cc972ae2d2727bd5/christina_morillo.jpg',
                details: {
                  size: 51455,
                  image: {
                    width: 552,
                    height: 552,
                  },
                },
                fileName: 'christina_morillo.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/christinamorillo/',
          twitter: 'https://twitter.com/divinetechygirl',
          bio: 'Christina Morillio is an information security professional, author, and technical product manager, focused on enterprise identity & security in cloud and beyond.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '5vanL4BxrwKNFEiKNVECnj',
          type: 'Entry',
          createdAt: '2020-09-25T17:43:46.381Z',
          updatedAt: '2021-11-21T23:55:39.703Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Rachel',
          lastName: 'Polish',
          work: 'Twilio',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '5ZFHbjX4nV217HuZqUJWN7',
              type: 'Asset',
              createdAt: '2020-09-25T17:43:41.649Z',
              updatedAt: '2020-09-25T17:43:41.649Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Rachel Polish',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/5ZFHbjX4nV217HuZqUJWN7/82e567ac02adc51dd4ca03bdc64f8c67/rachel_polish.jpg',
                details: {
                  size: 45735,
                  image: {
                    width: 500,
                    height: 500,
                  },
                },
                fileName: 'rachel_polish.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/rachelpolish/',
          twitter: 'https://twitter.com/rachelpolish',
          bio: 'Rachel is member of the Coast Guard that focuses on International communications, which translates perfectly to her role at Twilio as the Senior Manager of Internal Communications.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '5VcF3DOhPxhcK60IrSElxz',
          type: 'Entry',
          createdAt: '2020-09-25T17:30:08.521Z',
          updatedAt: '2021-11-22T00:22:08.247Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 5,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Alex',
          lastName: 'Reyes',
          work: 'Facebook',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '3KcYevdlsM2qtJazxOv1c2',
              type: 'Asset',
              createdAt: '2020-09-25T17:29:50.431Z',
              updatedAt: '2020-09-25T17:29:50.431Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Alex Reyes',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/3KcYevdlsM2qtJazxOv1c2/7d5b2a2d277f7d616faf2b6b985eb041/alex_reyes.jpg',
                details: {
                  size: 32774,
                  image: {
                    width: 400,
                    height: 400,
                  },
                },
                fileName: 'alex_reyes.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/alexreyes27/',
          twitter: 'https://twitter.com/LEXNFX1429',
          bio: 'Alex is an Air Force Veteran who transitioned into a role that is currently focused on the recruitment of Senior Software Engineers and Technical Leads in Mexico, Chile & Canadian talent markets for Meta ( Facebook ).\n',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '1hAjJIvAZFqGcHkLmi8pxu',
          type: 'Entry',
          createdAt: '2020-09-30T15:45:57.143Z',
          updatedAt: '2021-11-22T00:32:50.864Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Zed',
          lastName: 'Shaw',
          work: 'Learn Code The Hard Way',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '6gNu7cvTOP5O6JSRbshTiJ',
              type: 'Asset',
              createdAt: '2020-09-30T15:45:42.697Z',
              updatedAt: '2020-09-30T15:45:42.697Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Zed Shaw',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/6gNu7cvTOP5O6JSRbshTiJ/e01a0d0b49d4acee503ef259ca54bc2b/zed.jpg',
                details: {
                  size: 6511,
                  image: {
                    width: 512,
                    height: 512,
                  },
                },
                fileName: 'zed.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/zedshaw/',
          twitter: 'https://twitter.com/lzsthw',
          bio: 'Zed A. Shaw is a software developer best known for creating the Learn Code the Hard Way series of programming tutorials, as well as for creating the Mongrel web server for Ruby web applications.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '3MVm1YBo7fXCYVyLG1DEuo',
          type: 'Entry',
          createdAt: '2020-09-25T17:35:18.627Z',
          updatedAt: '2021-11-22T00:04:59.270Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 5,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Kyle',
          lastName: 'Shevlin',
          work: 'Software Engineer & Consultant',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '2V7Pvhz0TAM92fWiHM5OrB',
              type: 'Asset',
              createdAt: '2020-09-25T17:35:00.668Z',
              updatedAt: '2020-09-25T17:35:00.668Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Kyle Shelvin',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/2V7Pvhz0TAM92fWiHM5OrB/ada6c0e5b3c94c0667e50b5fcdc609c0/kyle_shelvin.jpg',
                details: {
                  size: 9221,
                  image: {
                    width: 200,
                    height: 200,
                  },
                },
                fileName: 'kyle_shelvin.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/kyleshevlin/',
          twitter: 'https://twitter.com/kyleshevlin',
          bio: 'Kyle Shevlin is a software engineer who specializes in JavaScript, React and front end web development.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '4IPNyQHBfo6EOGDFRkNULI',
          type: 'Entry',
          createdAt: '2021-11-11T01:52:01.828Z',
          updatedAt: '2021-11-21T23:49:41.876Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 2,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Melanie',
          lastName: 'Sumner',
          work: 'Hashicorp',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '4vTeOtWGtkqvPpndsmyeyf',
              type: 'Asset',
              createdAt: '2021-11-11T01:51:33.807Z',
              updatedAt: '2021-11-11T01:51:33.807Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Melanie Sumner',
              description: '',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/4vTeOtWGtkqvPpndsmyeyf/2cc5a61fa023c49fbf428a4163498007/Melanie.jpeg',
                details: {
                  size: 124540,
                  image: {
                    width: 800,
                    height: 800,
                  },
                },
                fileName: 'Melanie.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/melaniesumner/',
          twitter: 'https://twitter.com/melaniersumner',
          bio: 'Navy veteran who transitioned into an Accessibility Expert / Front End Engineering expert. Has large scale open-source and big-tech experience.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '2am5GdS6yepQc5lEYx33gL',
          type: 'Entry',
          createdAt: '2020-10-05T14:43:03.471Z',
          updatedAt: '2021-11-22T00:34:28.205Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 3,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Maxim',
          lastName: 'Thorne',
          work: 'CEO, CIVIC INFLUENCERS',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '1mQGVf9XXQVF62q0T85aNc',
              type: 'Asset',
              createdAt: '2020-10-05T14:41:53.491Z',
              updatedAt: '2020-10-05T14:41:53.491Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Maxim Thorne',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/1mQGVf9XXQVF62q0T85aNc/a8d36196c3d57aae325a15884fd68247/Maxim_thorne_hrc_sized.jpg',
                details: {
                  size: 55313,
                  image: {
                    width: 480,
                    height: 640,
                  },
                },
                fileName: 'Maxim_thorne_hrc_sized.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/maximthorne/',
          twitter: 'https://twitter.com/maximthorne?lang=en',
          bio: 'Maxim Thorne is an American lawyer and civil rights advocate who teaches on philanthropy at Yale University. He is the founder of JusticeInvestor, a litigation crowdfunding company focused on environmental and social justice cases. He became a Senior Vice-President of the NAACP in 2008,where he helped establish the first LGBT Task Force.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '1TD5WRDQ6yCM0HZGsgTtu9',
          type: 'Entry',
          createdAt: '2020-09-25T17:46:32.363Z',
          updatedAt: '2021-11-22T00:29:46.148Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 4,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Ken',
          lastName: 'Wheeler',
          work: 'Citadel Securities',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '5CJogB3LzDdAMrRAp9Qk4N',
              type: 'Asset',
              createdAt: '2020-09-25T17:46:27.256Z',
              updatedAt: '2020-09-25T17:46:27.256Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Ken Wheeler',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/5CJogB3LzDdAMrRAp9Qk4N/3ce85dfc5fa9075baab09773e9b459da/qAqo16iu_400x400.jpg',
                details: {
                  size: 17850,
                  image: {
                    width: 399,
                    height: 399,
                  },
                },
                fileName: 'qAqo16iu_400x400.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/kennywheeler/',
          twitter: 'https://twitter.com/ken_wheeler',
          bio: 'Open Source pioneer who focuses on the Javascript ecosystem and motivating those from underrepresented paths into programming.',
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'pkudqip5irxk',
            },
          },
          id: '72QTJNWakK03M53Zzr08Nx',
          type: 'Entry',
          createdAt: '2020-09-30T15:44:00.547Z',
          updatedAt: '2021-11-22T00:35:18.592Z',
          environment: {
            sys: {
              id: 'develop',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          revision: 5,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'boardMember',
            },
          },
          locale: 'en-US',
        },
        fields: {
          firstName: 'Caree',
          lastName: 'Youngman',
          work: 'Stitchfix',
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'pkudqip5irxk',
                },
              },
              id: '5X0zeatyoZ0t5WVW46hK6c',
              type: 'Asset',
              createdAt: '2020-09-30T15:43:35.081Z',
              updatedAt: '2020-09-30T15:43:35.081Z',
              environment: {
                sys: {
                  id: 'develop',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'Caree',
              file: {
                url: '//images.ctfassets.net/pkudqip5irxk/5X0zeatyoZ0t5WVW46hK6c/04d4c3c837c0a3fa70f1f7810dd7b6ec/caree.jpg',
                details: {
                  size: 77406,
                  image: {
                    width: 500,
                    height: 500,
                  },
                },
                fileName: 'caree.jpg',
                contentType: 'image/jpeg',
              },
            },
          },
          linkedin: 'https://www.linkedin.com/in/caree-youngman-a87339ab/',
          twitter: 'https://twitter.com/careecodes',
          bio: 'Software Engineering Manager with a heavy background in front end development and a passion for bringing teams together.',
        },
      },
    ],
    includes: {
      Asset: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '19HyYAJKxEbFf5QtVCS1Ps',
            type: 'Asset',
            createdAt: '2020-09-25T17:33:53.438Z',
            updatedAt: '2020-09-25T17:33:53.438Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Christina Morillo',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/19HyYAJKxEbFf5QtVCS1Ps/0007ebefa6bafd68cc972ae2d2727bd5/christina_morillo.jpg',
              details: {
                size: 51455,
                image: {
                  width: 552,
                  height: 552,
                },
              },
              fileName: 'christina_morillo.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '1YcWsR1gw9vV7KgV6LlJ5c',
            type: 'Asset',
            createdAt: '2020-09-25T17:25:27.827Z',
            updatedAt: '2020-09-25T17:25:27.827Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Anna Lee',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/1YcWsR1gw9vV7KgV6LlJ5c/100acf5839d9727bd2e35e1bf4e2fa1c/0.jpeg',
              details: {
                size: 29477,
                image: {
                  width: 400,
                  height: 400,
                },
              },
              fileName: '0.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '1mQGVf9XXQVF62q0T85aNc',
            type: 'Asset',
            createdAt: '2020-10-05T14:41:53.491Z',
            updatedAt: '2020-10-05T14:41:53.491Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Maxim Thorne',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/1mQGVf9XXQVF62q0T85aNc/a8d36196c3d57aae325a15884fd68247/Maxim_thorne_hrc_sized.jpg',
              details: {
                size: 55313,
                image: {
                  width: 480,
                  height: 640,
                },
              },
              fileName: 'Maxim_thorne_hrc_sized.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '2V7Pvhz0TAM92fWiHM5OrB',
            type: 'Asset',
            createdAt: '2020-09-25T17:35:00.668Z',
            updatedAt: '2020-09-25T17:35:00.668Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Kyle Shelvin',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/2V7Pvhz0TAM92fWiHM5OrB/ada6c0e5b3c94c0667e50b5fcdc609c0/kyle_shelvin.jpg',
              details: {
                size: 9221,
                image: {
                  width: 200,
                  height: 200,
                },
              },
              fileName: 'kyle_shelvin.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '3KcYevdlsM2qtJazxOv1c2',
            type: 'Asset',
            createdAt: '2020-09-25T17:29:50.431Z',
            updatedAt: '2020-09-25T17:29:50.431Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Alex Reyes',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/3KcYevdlsM2qtJazxOv1c2/7d5b2a2d277f7d616faf2b6b985eb041/alex_reyes.jpg',
              details: {
                size: 32774,
                image: {
                  width: 400,
                  height: 400,
                },
              },
              fileName: 'alex_reyes.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '3k0DWHVxP8j7NRyMdozBXg',
            type: 'Asset',
            createdAt: '2020-09-25T17:35:53.503Z',
            updatedAt: '2020-09-25T17:35:53.503Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Paul Ford',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/3k0DWHVxP8j7NRyMdozBXg/c302ad91f55fa08106905dd6b571e0d2/paul_ford.jpg',
              details: {
                size: 13474,
                image: {
                  width: 200,
                  height: 200,
                },
              },
              fileName: 'paul_ford.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '4vTeOtWGtkqvPpndsmyeyf',
            type: 'Asset',
            createdAt: '2021-11-11T01:51:33.807Z',
            updatedAt: '2021-11-11T01:51:33.807Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Melanie Sumner',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/4vTeOtWGtkqvPpndsmyeyf/2cc5a61fa023c49fbf428a4163498007/Melanie.jpeg',
              details: {
                size: 124540,
                image: {
                  width: 800,
                  height: 800,
                },
              },
              fileName: 'Melanie.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '59GlaHFopuLpUh3VedhsC2',
            type: 'Asset',
            createdAt: '2020-09-25T17:33:02.679Z',
            updatedAt: '2020-09-25T17:33:02.679Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Brian Holt',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/59GlaHFopuLpUh3VedhsC2/336c4f69c3c318b2c438df2b5f66874a/brian_holt.jpg',
              details: {
                size: 8164,
                image: {
                  width: 200,
                  height: 200,
                },
              },
              fileName: 'brian_holt.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '5CJogB3LzDdAMrRAp9Qk4N',
            type: 'Asset',
            createdAt: '2020-09-25T17:46:27.256Z',
            updatedAt: '2020-09-25T17:46:27.256Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Ken Wheeler',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/5CJogB3LzDdAMrRAp9Qk4N/3ce85dfc5fa9075baab09773e9b459da/qAqo16iu_400x400.jpg',
              details: {
                size: 17850,
                image: {
                  width: 399,
                  height: 399,
                },
              },
              fileName: 'qAqo16iu_400x400.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '5X0zeatyoZ0t5WVW46hK6c',
            type: 'Asset',
            createdAt: '2020-09-30T15:43:35.081Z',
            updatedAt: '2020-09-30T15:43:35.081Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Caree',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/5X0zeatyoZ0t5WVW46hK6c/04d4c3c837c0a3fa70f1f7810dd7b6ec/caree.jpg',
              details: {
                size: 77406,
                image: {
                  width: 500,
                  height: 500,
                },
              },
              fileName: 'caree.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '5ZFHbjX4nV217HuZqUJWN7',
            type: 'Asset',
            createdAt: '2020-09-25T17:43:41.649Z',
            updatedAt: '2020-09-25T17:43:41.649Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Rachel Polish',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/5ZFHbjX4nV217HuZqUJWN7/82e567ac02adc51dd4ca03bdc64f8c67/rachel_polish.jpg',
              details: {
                size: 45735,
                image: {
                  width: 500,
                  height: 500,
                },
              },
              fileName: 'rachel_polish.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '6gNu7cvTOP5O6JSRbshTiJ',
            type: 'Asset',
            createdAt: '2020-09-30T15:45:42.697Z',
            updatedAt: '2020-09-30T15:45:42.697Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Zed Shaw',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/6gNu7cvTOP5O6JSRbshTiJ/e01a0d0b49d4acee503ef259ca54bc2b/zed.jpg',
              details: {
                size: 6511,
                image: {
                  width: 512,
                  height: 512,
                },
              },
              fileName: 'zed.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '7ICvhmnciFN1iORusaLsNc',
            type: 'Asset',
            createdAt: '2020-09-25T17:42:42.147Z',
            updatedAt: '2021-11-22T00:44:05.705Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 2,
            locale: 'en-US',
          },
          fields: {
            title: 'Chris Christi',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/7ICvhmnciFN1iORusaLsNc/ae060161a64330cf93d04549d89fb462/LI_Headshot.jpeg',
              details: {
                size: 30276,
                image: {
                  width: 490,
                  height: 490,
                },
              },
              fileName: 'LI Headshot.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: '7L4klRqZld3v1YcfwQB4Uw',
            type: 'Asset',
            createdAt: '2020-09-25T17:38:33.863Z',
            updatedAt: '2020-09-25T17:38:33.863Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Amanda Casari',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/7L4klRqZld3v1YcfwQB4Uw/303b3380a76a73fc856986f81270e047/amanda_casari.jpg',
              details: {
                size: 15784,
                image: {
                  width: 200,
                  height: 200,
                },
              },
              fileName: 'amanda_casari.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'pkudqip5irxk',
              },
            },
            id: 'POuy6K4SHQNunyr1Ecu0i',
            type: 'Asset',
            createdAt: '2021-11-11T01:48:37.049Z',
            updatedAt: '2021-11-11T01:48:37.049Z',
            environment: {
              sys: {
                id: 'develop',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            revision: 1,
            locale: 'en-US',
          },
          fields: {
            title: 'Taylor Desseyn',
            description: '',
            file: {
              url: '//images.ctfassets.net/pkudqip5irxk/POuy6K4SHQNunyr1Ecu0i/d855f3a373efc40a26964814bf9152c3/taylor.jpeg',
              details: {
                size: 32836,
                image: {
                  width: 400,
                  height: 400,
                },
              },
              fileName: 'taylor.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
      ],
    },
  },
}
