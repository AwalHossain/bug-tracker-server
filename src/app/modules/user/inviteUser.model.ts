import mongoose from 'mongoose';

interface IInviteUser extends mongoose.Document {
    email: string;
    token: string;
    boardId: string;
}

const inviteUser = new mongoose.Schema<IInviteUser>({
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    boardId: {
        type: String,
    },
});

const InviteUser = mongoose.model('InviteUser', inviteUser);
