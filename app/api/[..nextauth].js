// TODO implement nextauth

// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import axios from 'axios';
// import AuthService from '../services/auth.service';

// // interface ICredentials {
// //   password: string;
// //   username: string;
// //   email?: string;
// // }

// const providers = [
//   CredentialsProvider({
//     id: 'login',
//     name: 'Login Credentials',
//     async authorize(credentials) {
//       debugger;
//       const res = await AuthService.login(credentials);

//       if (res.token) {
//         return res;
//       }
//       return null;
//     },
//   }),
//   CredentialsProvider({
//     id: 'signup',
//     name: 'Signup Credentials',
//     async authorize(credentials) {
//       debugger;
//       const res = await AuthService.signup(credentials);

//       if (res.token) {
//         return res;
//       }
//       return null;
//     },
//   }),
// ];

// const callbacks = {
//   // Getting the JWT token from API response
//   async jwt(token, user) {
//     debugger;
//     if (user) {
//       token = user.token;
//     }

//     return token;
//   },

//   async session(session, token) {
//     debugger;
//     session.token = token;
//     return session;
//   },
// };

// const options = {
//   providers,
//   callbacks,
// };

// export default (req, res) => NextAuth(req, res, options);
