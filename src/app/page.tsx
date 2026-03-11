/**
 * Landing page — reserved for future features.
 * For now, redirects to /chat.
 */
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/chat');
}
