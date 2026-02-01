/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type LayoutProp = {
  className?: string;
  children: ReactNode;
  showWhatsapp?: boolean;
  header?: ReactNode;
};

export interface DemoTypeProp {
  id: number;
  name: string;
}

export interface ArtisteCardProps {
  artistId?: string;
  artistName?: string;
  id: string;
  name: string | null;
  profileImage: string | null;
  totalStreams: string;
  username: string;
  followed: any;
}

export interface DemoCardProps {
  id: string;
  artiste: { id: string; name: string | null; username: string };
  coverImage: string | null;
  filePath: string | null;
  title: string;
}
