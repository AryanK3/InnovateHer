import Link from 'next/link'; // Ensure correct import

export default function HomePage() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/signin">Sign In</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}
