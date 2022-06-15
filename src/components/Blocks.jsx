import { chainApi } from "apis";
import { useState, useEffect } from "react";
import { truncate } from "utils/shortenAddress";

export default function Blocks() {
    const [blocks, setBlocks] = useState([]);

    // Difficulty: 5
    // Hash: "0143a873aca3e1668545411c617f5261cb6c77e9e1f872045abf05f9cde6bb65"
    // MerkleRoot: "d5a7097b8ba749a6091ce1faf90ceda603e00683a2466f549501412dce980eb5"
    // Nonce: 57
    // PrevHash: ""
    // Timestamp: "1655200014"
    // TxCount: 1

    useEffect(() => {
        chainApi.getBlockchain().then((res) => {
            setBlocks(res?.data?.result || []);
        });
    }, []);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-blocks">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <h3 className="text-white text-3xl text-center my-2">
                    Blocks History
                </h3>
                <div class="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Hash
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Timestamp
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nonce
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Difficulty
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    MerkleRoot
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    PrevHash
                                </th>
                                {/* <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blocks.map((block, index) => {
                                    return (
                                        <tr class="bg-white dark:bg-gray-800" key={block.Hash}>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                {truncate(block.Hash, 10)}
                                            </th>
                                            <td class="px-6 py-4">
                                                {block.Timestamp}
                                            </td>
                                            <td class="px-6 py-4">
                                                {block.Nonce}
                                            </td>
                                            <td class="px-6 py-4">
                                                {block.Difficulty}
                                            </td>
                                            {/* <td class="px-6 py-4 text-right">
                                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td> */}
                                            <td class="px-6 py-4">
                                                {truncate(block.MerkleRoot, 5)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {truncate(block.PrevHash, 5)}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}