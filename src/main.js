import satori from 'satori';

export default async ({ req, res, log, error }) => {
  const svg = await satori(
    `<div style="color: black;">hello, world</div>`,
    {
      width: 1200,
      height: 630
    },
  );

  return res.send(svg, 200, {
    'Content-Type': 'image/svg+xml',
  });
};
