import { Metadata, NextPage } from "next";
import { Provider } from "@/store/Provider";
import { BookmarksList } from "@/components/BookmarksList";

export const metadata: Metadata = {
    title: "Tin-Book | Bookmarks",
    description: "Search your next book",
};

const BookMarkPage: NextPage = () => {
    return (
        <main className="min-h-screen">
            <Provider>
                <BookmarksList />
            </Provider>
        </main>
    );
};

export default BookMarkPage;
