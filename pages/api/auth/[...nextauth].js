import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER, // e.g. smtp://user:pass@smtp.example.com:587
      from: process.env.EMAIL_FROM, // e.g. no-reply@yourdomain.com
    }),
  ],
  pages: {
    signIn: '/admin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
