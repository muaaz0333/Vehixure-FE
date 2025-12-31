export function Footer() {
  return (
    <footer className="bg-[#303030] text-white lg:py-4 py-6 sm:py-8 px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <p className="text-sm text-white">© WarrantyDB.com {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}