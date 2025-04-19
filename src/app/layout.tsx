import StyledComponentsRegistry from '@/lib/registry';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'EduFund — Decentralized Student Crowdfunding',
  description: 'Support student education with transparency and trust.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Navbar />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
