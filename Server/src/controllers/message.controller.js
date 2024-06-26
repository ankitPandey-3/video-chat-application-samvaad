import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username profileImage")
      .populate("chat");
    return res
      .status(201)
      .json(new ApiResponse(201, messages, "Successfully sent"));
  } catch (error) {
    return res.status(404).json(new ApiError(404, "Chat not Found"));
  }
};

const sendMessages = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username profileImage");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username profileImage",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(200).json(
        new ApiResponse(200, message, "Message Create Successfully")
    )
  } catch (error) {
    return res.status(400).json(
        new ApiError(400, 'Message Not Created')
    )
  }
};

export { allMessages, sendMessages };
