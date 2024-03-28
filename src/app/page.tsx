"useClient"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  redirect('/home');
}
