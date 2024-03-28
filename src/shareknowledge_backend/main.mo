import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Bool "mo:base/Bool";

actor Assistant {

  type Book = {
    title : Text;
    available : Bool;
  };

  func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n));
  };

  var books = Map.HashMap<Nat, Book>(0, Nat.equal, natHash);
  var nextId : Nat = 0;

  public query func getBooks() : async [Book] {
    Iter.toArray(books.vals());
  };

  public func addBook(title : Text, available : Bool) : async Nat {
    let id = nextId;
    books.put(id, { title = title; available = available });
    nextId += 1;
    id;
  };

  public func borrowBook(id : Nat) : async () {
    ignore do ? {
      let title = books.get(id)!.title;
      books.put(id, { title; available = false });
    };
  };

};
