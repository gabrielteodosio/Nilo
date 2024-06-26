import { type NextPage } from "next";

import Head from "next/head";
import { type Task } from "@prisma/client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Home: NextPage = () => {
  const user = useUser();

  const { data: allTasks } = api.task.getAll.useQuery();

  const formatDate = (date: Date | null) => {
    if (date === null) {
      return;
    }

    const day = `0${date.getDay()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const renderTable = (task: Task) => {
    return (
      <TableRow key={task.id}>
        <TableCell>{task.authorId}</TableCell>
        <TableCell>{task.title}</TableCell>
        <TableCell>{task.description}</TableCell>
        <TableCell>{formatDate(task.createdAt)}</TableCell>
        <TableCell>{formatDate(task.dueDate)}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Head>
        <title>Nilo App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
        <Button variant={user.isSignedIn ? "outline" : "default"} className="mb-4" asChild>
          {!!user && user.isSignedIn ? <SignOutButton /> : <SignInButton />}
        </Button>

        <Table>
          <TableCaption>Todas atividades listadas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Autor - Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Data de Entrega</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{allTasks?.map((task) => renderTable(task))}</TableBody>
        </Table>
      </main>
    </>
  );
};

export default Home;
