import User from "../models/User.js";
import { calculateScoreAndStars } from "../utils/scoreCalculator.js";

export const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("progress");
    res.json({
      message: "User progress fetched successfully",
      progress: user.progress,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { correct, cluesUsed } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { score, stars } = calculateScoreAndStars({ correct, cluesUsed });
    let currentLevel =
      user.progress.length > 0
        ? user.progress[user.progress.length - 1].level
        : 1;
    let currentScore = user.progress.score;
    let currentStars = user.progress.stars;

    if (correct) {
      currentLevel = user.progress.level + 1;
      currentScore += score;
      currentStars += stars;
    }
    user.progress.level = currentLevel ?? user.progress.level;
    user.progress.score = currentScore ?? user.progress.score;
    user.progress.stars = currentStars ?? user.progress.stars;
    user.progress.completedAt = new Date();

    await user.save();
    res.json({ message: "Progress updated", progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
