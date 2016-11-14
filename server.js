'use strict';

const Hapi = require('hapi');

//cart:
let cart = {};


// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.register([require('inert')], (err) => {

  if (err) {
  console.error('Failed to load a plugin:', err);
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return reply.file("views/index.html");
    }
  });

  server.route({
    method: 'GET',
    path: '/js/{path}',
    handler: (request, reply) => {
      return reply.file('./js/' + request.params.path);
    }
  });

  server.route({
    method: 'GET',
    path: '/cart',
    handler: (request, reply) => {
      return reply(cart);
    }
  });

  server.route({
    method: 'POST',
    path: '/cart',
    config: {
      payload: {
        output: 'data'
      }
    },
    handler: (request, reply) => {
      let productId = request.payload.id;
      if ( cart[productId] ) {
        cart[productId].count++;
      } else {
        cart[productId] = {
          name : request.payload.name,
          count: 1
        }
      }
      return reply(cart);
    }
  });

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server is listening at ' + server.info.uri);
  });

});
