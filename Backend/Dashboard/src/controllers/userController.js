exports.getUserInfo = async (req, res) => {
  try {
    // This would typically integrate with your User Auth API
    // For now, we'll return a mock response
    const userId = req.params.id;
    
    // In production, fetch this from your actual user authentication service
    const userInfo = {
      id: userId,
      name: `User ${userId}`,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
    };
    
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
};