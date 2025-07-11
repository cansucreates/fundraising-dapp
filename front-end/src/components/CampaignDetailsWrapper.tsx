import { promises as fs } from "fs";
import path from "path";
import CampaignDetails from "./CampaignDetails";

async function getData() {
  const campaignDir = path.join(process.cwd(), "public/campaign");
  const imageFiles = await fs.readdir(campaignDir);
  const images = imageFiles.map((file) => `/campaign/${file}`);

  const markdownPath = path.join(process.cwd(), "public/campaign-details.md");
  const markdownContent = await fs.readFile(markdownPath, "utf8");

  return { images, markdownContent };
}

export default async function CampaignDetailsWrapper() {
  const { images, markdownContent } = await getData();

  return <CampaignDetails images={images} markdownContent={markdownContent} />;
} 