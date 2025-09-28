import User from "../models/User.js";

export const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("progress");
    res.json({
        message: "User progress fetched successfully",
        progress: user.progress
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { level, score, stars } = req.body;

    const user = await User.findById(req.user._id);
    user.progress.level = level ?? user.progress.level;
    user.progress.score = score ?? user.progress.score;
    user.progress.stars = stars ?? user.progress.stars;

    user.progress.completedAt = new Date();

    await user.save();
    res.json({ message: "Progress updated", progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
