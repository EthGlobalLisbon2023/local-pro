/*/////////////////////////////////////////////////////////////////////////////

  Author  : @qodeninja

/////////////////////////////////////////////////////////////////////////////*/

	const NULL = Symbol.for('NULL_SYMBOL');

  const lib = {
  	get: ()=>{
  		return Symbol.for('NULL_SYMBOL');
  	},
  	is : (ref)=>{
  		return (typeof ref!=='undefined' && ref===null || ref === NULL );
  	},
  	to : (ref)=>{
  		if( lib.is(ref) ) return lib.get()
  		return ref;
  	},
  	isRef: (ref)=>{
  		return (ref===NULL);
  	},
  	isEmpty: (ref)=>{
  		return (lib.isNullRef(ref) || ref==='');
  	},
  	emptyType : (ref)=>{
  		if (typeof ref==='undefined') return 'IS_UNDEFINED';
  		if (ref==='') return 'IS_EMPTY';
  		if (ref===NULL) return 'IS_NULLREF';
  		if (ref===null) return 'IS_NULL';
  		return 'NOT_EMPTY';
  	}

  }

/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/

module.exports = ()=>{ return NULL; }
module.exports.lib = lib;
module.exports.isNull    = lib.is;
module.exports.isNullRef = lib.isRef;
module.exports.toNull = lib.to;
module.exports.NULL = NULL;