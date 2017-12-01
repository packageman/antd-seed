export default {
  createToken: (req, res) => {
    const params = req.body;
    if (params.username === 'admin' && params.password === 'abc123_') {
      res.json({
        id: 1,
        name: 'admin',
        avatar: 'http://vincenthou.qiniudn.com/ce92e2370931350b964de2f9.jpg',
        token: 'cf6b8f9a-d775-02dc-8c8c-a72874d15b64',
        autoLogin: params.remember,
      });
      return;
    }

    res.status(400).json({
      message: '无效的用户名或密码',
    });
  },
};
