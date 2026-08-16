import { promises as fs } from 'fs';
import path from 'path';
import products from '../../products.json';

export default async function handler(req, res){
  if(req.method === 'GET'){
    res.setHeader('Content-Type','application/json');
    res.status(200).json(products);
  } else {
    res.status(405).end();
  }
}
