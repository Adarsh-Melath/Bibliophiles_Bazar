import { Heart, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function WishlistPreview({ wishlistItems = [] }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price)
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 text-center border border-accent/40">
                <Heart className="w-12 h-12 text-heading-muted mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold text-heading mb-2">
                    Your wishlist is empty
                </h3>
                <p className="font-body text-sm text-heading-muted mb-4">
                    Start adding books you love to your wishlist.
                </p>
                <Link
                    to="/books"
                    className="inline-flex items-center gap-2 bg-primary text-white
                               px-6 py-2 rounded-full font-body text-sm font-medium
                               hover:bg-primary/90 transition-colors">
                    <BookOpen size={16} />
                    Browse Books
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-accent/40">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <h3 className="font-heading text-lg font-semibold text-heading">
                        Wishlist
                    </h3>
                </div>
                <Link
                    to="/wishlist"
                    className="font-body text-sm text-primary hover:text-primary/80
                               font-medium transition-colors">
                    View All ({wishlistItems.length})
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {wishlistItems.slice(0, 3).map((item) => (
                    <Link
                        key={item.id}
                        to={`/books/${item.book.id}`}
                        className="group border border-accent/40 rounded-xl p-4
                                   hover:border-primary/40 hover:shadow-sm transition-all">
                        <div className="aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-accent/20">
                            <img
                                src={item.book.coverImage || '/covers/default-book.jpg'}
                                alt={item.book.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    e.target.src = '/covers/default-book.jpg'
                                }}
                            />
                        </div>
                        <h4 className="font-heading text-sm font-medium text-heading
                                       line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {item.book.title}
                        </h4>
                        <p className="font-body text-xs text-heading-muted mb-2">
                            by {item.book.author}
                        </p>
                        <p className="font-heading text-sm font-semibold text-primary">
                            {formatPrice(item.book.price)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}