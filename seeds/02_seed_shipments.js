export async function seed(knex) {
  await knex('shipments').del();

  await knex('shipments').insert([
    {
      carrier: 'FedEx',
      created_at: new Date().toISOString(),
      label_url: 'https://easypost-files.com/examplelabel1.png',
      ship_from: JSON.stringify({
        name: 'Treviant HQ',
        street1: '123 Main St',
        city: 'Fort Worth',
        state: 'TX',
        zip: '76107',
      }),
      ship_to: JSON.stringify({
        name: 'Customer A',
        street1: '456 Elm St',
        city: 'Dallas',
        state: 'TX',
        zip: '75201',
      }),
      user_id: 1,
    },
  ]);
}
