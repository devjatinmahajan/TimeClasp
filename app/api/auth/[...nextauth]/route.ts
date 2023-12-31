import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';
// import Nextauth from './[...nextauth]';

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         })
//     ],
//     callbacks: {
//         async session({ session }: { session: any }) {
//             // store the user id from MongoDB to session
//             ////
//             const sessionUser = await UserModel.findOne({ email: session.user?.email });
//             session.user.id = sessionUser._id.toString();

//             return session;
//         },
//         async signIn({ account, profile, user, credentials }) {
//             try {
//                 await connectToDatabase();

//                 // check if user already exists
//                 const userExists = await UserModel.findOne({ email: profile?.email });

//                 // if not, create a new document and save user in MongoDB
//                 if (!userExists) {
//                     await UserModel.create({
//                         email: profile?.email,
//                         username: profile?.name?.replace(" ", "").toLowerCase(),
//                         // image: profile.picture,
//                     });
//                 }

//                 return true
//             } catch (error: any) {
//                 //
//                 return false
//             }
//         },
//     }
// })
const handler = NextAuth(authOptions);
// const handler = Nextauth(authOptions);
// export default NextAuth(authOptions);

export { handler as GET, handler as POST }