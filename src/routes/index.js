export default (app) => {
  app.get('/health', (req, res) => {
    res.sendStatus(200);
  })
};
