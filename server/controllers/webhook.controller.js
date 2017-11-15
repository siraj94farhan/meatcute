import Parse from 'parse/node';

import { APP_ID, MASTER_KEY, HOST, PORT } from '../../config';

Parse.initialize(APP_ID);
Parse.masterKey = MASTER_KEY;
Parse.serverUrl = `http://${HOST}:${PORT}/meatcute`;

const Organization = Parse.Object.extend('organization');

export async function createOrganization(req, res) {
  const { name, id } = req.body.current;
  let organization = new Organization();

  organization.set('name', name);
  organization.set('pipedrive_organization_id', id);

  organization = await organization.save();

  res.json(organization.toJSON());
}
