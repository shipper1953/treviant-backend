// seeds/02_seed_shipments.js

export async function seed(knex) {
  await knex('shipments').del();

  await knex('shipments').insert([
    {
      carrier: 'UPS',
      label_url: 'https://example.com/label/ups1.png',
      ship_from: JSON.stringify({
        name: 'Sender One',
        address: '123 Sender St',
        city: 'Austin',
        state: 'TX',
        zip: '73301'
      }),
      ship_to: JSON.stringify({
        name: 'Recipient One',
        address: '456 Receiver Blvd',
        city: 'Dallas',
        state: 'TX',
        zip: '75201'
      }),
      user_id: 2,
    },
    {
      carrier: 'FedEx',
      label_url: 'https://example.com/label/fedex1.png',
      ship_from: JSON.stringify({
        name: 'Sender Two',
        address: '789 Sender Rd',
        city: 'Houston',
        state: 'TX',
        zip: '77001'
      }),
      ship_to: JSON.stringify({
        name: 'Recipient Two',
        address: '321 Receiver Ave',
        city: 'San Antonio',
        state: 'TX',
        zip: '78201'
      }),
      user_id: 3,
    },
  ]);
}
