

export default function Dashboard(){
    return(
        <div className=" h-full px-6 py-6">
                <div className="text-xl font-semibold">
                    Analisis Produk & Toko
                </div>
                <div>Update Terakhir :</div>

                <div className="flex mt-4 gap-6">

                        <div className="border boder-black rounded-xl shadow-lg w-72 h-44 p-3">
                            Profil Hari Ini
                        </div>
                        <div className="border boder-black rounded-xl shadow-lg w-72 h-44 p-3">
                            Total Penjualan Hari Ini
                        </div>
                        <div className="border boder-black rounded-xl shadow-lg w-72 h-44 p-3">
                            Sisa Stock Total Produk
                        </div>
                    
                </div>
        </div>
    )
}