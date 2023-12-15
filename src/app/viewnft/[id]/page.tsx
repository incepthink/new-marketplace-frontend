import ViewNFT from '@/components/ViewNFT';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-black min-h-screen">
      <ViewNFT id={params.id} />
    </div>
  );
}
